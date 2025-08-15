const { Strategy, ExtractJwt } = require('passport-jwt');

const jwt = require('jsonwebtoken');

const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const opts = {

};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //function extract token
opts.secretOrKey = process.env.JWT_SECRET; // Secret Code use : `openssl rand -base64 64`



module.exports = (passport) => {

  passport.use(
  //jwt_payload : decoded token (user content)
    new Strategy(opts,  async (jwt_payload, done) => {
      const user =  await prisma.user.findUnique( //check db
             {
             where : {id : jwt_payload.id}
            }
             ) 
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};
