const passport = require("passport")
const  localstrategy= require("passport-local").Strategy
const bcrypt = require("bcrypt")

const USER = require("../Models/userSchema")

passport.use(new localstrategy({ usernameField:"email", passwordField:"password"}, 
async(email , password , done)=>{
try {
        const loguser  =   await USER.findOne({email : email})
         if(!loguser){
         return done(null , false , {message : "email not found"})
    }
    const ismatch = await  bcrypt.compare(password , loguser.password)
    if(!ismatch){
    return done(null , false , {message : "password is wrong"})
    }
    return done(null , loguser)
   }catch (error) {
    return done(error)
  }
 }
 ))

module.exports = passport