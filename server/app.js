require("dotenv").config();  



const express = require('express');
const path = require("node:path");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser"); 
const controller = require("./controller")
const cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

require('./utils/passport')(passport);

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();


const app = express();

app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/signin",controller.signin)

app.post('/login', controller.login);

app.put("/profile", upload.single('image'),controller.profile_edit)

app.post("/profile",controller.profile)


app.post("/user",controller.user)


app.post("/message",controller.new_message)

app.post("/conversation",controller.new_conversation)

app.post("/messages",controller.messages)

app.post("/messages/all",controller.messages_all)


app.post("/conversations",controller.conversations)







app.listen("3000",()=>{
    console.log("listening . . .")
})