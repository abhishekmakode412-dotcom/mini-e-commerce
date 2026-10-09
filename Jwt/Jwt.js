const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")

const  jwttoken =async  (req , res , next)=>{
   try{
     const authheader = req.headers.authorization
       if (!authheader) {
         return res.status(401).json({
        message: "Token missing"
        }); 
      }
      const token = authheader.split(' ')[1]
      const decode = await jwt.verify(token , process.env.JWT_SECRET_KEY)
      req.payload = decode
      next()
   }catch(error){
         res.status(505).json({
          message:"internal server error", 
          error:error.message
           })
   }
}

const generatetoken = async(user)=>{
  const gentoken =  jwt.sign(user , process.env.JWT_SECRET_KEY)
  return gentoken
}
module.exports = {jwttoken , generatetoken}