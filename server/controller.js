const cloudinary = require("cloudinary").v2;
require("dotenv").config();  
const fs = require("fs");

const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");


cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

const validateUser = [ //array of rules

  body("username").trim()
    .notEmpty().withMessage(`username is empty`),
    
  body("PlainPassword").trim()
    .notEmpty().withMessage(`password is empty`),

  body("Confirmpassword").custom((value, {req})=>{

    if(value !== req.body.PlainPassword){
        throw new Error("Password doesnt match")
    }
    return true

  })
];

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs"); 
const { json } = require('express');

exports.signin =  [validateUser,async (req,res)=>{

    

    const errors = validationResult(req); 

    if(!errors.isEmpty()){
        return res.status(400).json({
            message : "Input Errors found",
            errors : errors.array()
        })
    }


    const {username,PlainPassword} = req.body


    const password = await bcrypt.hash(PlainPassword, 10);

    const user = await prisma.user.create({
        data : {
            username,password
        }
    })

    const defaultAccounts = await prisma.user.findMany();

    for (const account of defaultAccounts) {
  await prisma.conversation.create({
    data: {
      USER_ONE_ID: user.id,
      USER_TWO_ID: account.id
    }
  })};

  res.json({ user });


}]

exports.login = async (req, res) => {
  const { username, password } = req.body;


  const user = await prisma.user.findUnique({
    where : {
        username
    }
  })

    const match = await bcrypt.compare(password, user.password);


  if (!match) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token , id : user.id });
}



exports.profile_edit = async (req,res) => {
    const { username, displayName, bio } = req.body;

    let imageUrl;

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: "profile_images/" + username,
            overwrite: true,
            folder: "profile_images",
        });
        imageUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
    }

    const updateData = {
        displayName,
        bio
    };

    if (imageUrl) {
        updateData.image = imageUrl; // only update if new image uploaded
    }

    const user = await prisma.user.update({
        where: { username },
        data: updateData
    });

    res.status(200).json({
        message: "Successfully edited profile",
        user
    });
};


exports.new_message = async (req,res)=>{

        const {text,ConversationID,UserID} = req.body


     const msg = await prisma.message.create({
        data : {
            text , ConversationID : parseInt(ConversationID,10) ,UserID : parseInt(UserID,10)
        } })


          res.status(200).json({
        message : "successfully added message",
        message : msg})


}



exports.new_conversation = async (req,res)=>{

    const {USER_ONE_ID,USER_TWO_ID} = req.body

    const [userOneId, userTwoId] = [USER_ONE_ID, USER_TWO_ID].sort((a, b) => a - b);

    try{

        const conv = await prisma.conversation.create({
        data : {
            USER_ONE_ID : userOneId,USER_TWO_ID : userTwoId
        } })


          res.status(200).json({
        message : "successfully added conversation",
        conv : conv
    })
    

    }
    catch(err){
        
        res.status(400).json({
            message : "conversation allready exist"
        })
        
    }
    


}

exports.messages = async (req,res)=>{

    
    const {ConversationID} = req.body


     const messages = await prisma.message.findMany({
        where : {
            ConversationID : parseInt(ConversationID,10)
        } ,
      include : {
        User : true
      }})


        res.status(200).json({
        message : "successfully fetched",
        messages : messages})


}

exports.messages_all = async (req,res)=>{

    
    const {UserID} = req.body


     const messages = await prisma.message.findMany({
        where : {
            UserID
        } })


        res.status(200).json({
        message : "successfully fetched",
        messages : messages})


}

exports.profile = async (req,res)=>{

    
    const {username} = req.body


     const infos = await prisma.user.findUnique({
        where : {
            username
        } })


        res.status(200).json({
        message : "successfully fetched",
        infos : infos})


}

exports.user = async (req,res)=>{

    
    const {id} = req.body


     const infos = await prisma.user.findUnique({
        where : {
            id
        } })


        res.status(200).json({
        message : "successfully fetched",
        infos : infos})


}


exports.conversations = async (req,res)=>{

    
    const {username} = req.body
    

    const user = await prisma.user.findUnique({
      where : {
        username
      }
    })

    const UserID = user.id

     const conversations = await prisma.conversation.findMany({
        where : {
            OR : [{USER_ONE_ID : UserID},{USER_TWO_ID : UserID}]
        },
      include: {
    USER_TWO: true,
    USER_ONE:true
  }})



      res.status(200).json({
      message : "successfully fetched",
      conversations : conversations,
    })

    


}

