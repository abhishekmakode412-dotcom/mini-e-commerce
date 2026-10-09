const express =  require("express")
const router = express.Router()
const passport = require("../Authentication/Authentication")

const USER = require("../Models/userSchema")
const hashedpassword = require("../Passhass/Hashedpassword")
const {jwttoken , generatetoken} = require("../Jwt/Jwt")
const bcrypt = require("bcrypt")

router.post("/signup" , async(req , res)=>{
   try {  
        const hashpassword = await hashedpassword(req.body.password , 10)
         const userdata = {...req.body , password:hashpassword }
         const  newuserdata = new USER(userdata) 
         const response =  await newuserdata.save()
         const token = await generatetoken({name : response.name , id:response._id , role:response.role})
         res.status(201).json({message:"new user created" ,
             response : response, 
            token :token
        })
   } catch (error) {
       res.status(500).json(
        {message : "internall server error : " , error:error.message}
    )
   }
})

router.post("/login" , passport.authenticate('local' , {session : false}),async(req , res)=>{
  try {
    const token = await generatetoken({name : req.user.name , _id : req.user._id , role:req.user.role})
     res.status(200).json({message :"user found" ,
        user :{
            _id:req.user._id,
            name : req.user.name,
            email:req.user.email
        },
        token : token
     })
  } catch (error) {
    res.status(404).json({message:"not found " , error:error})
  }
})

router.get("/profile" ,  jwttoken, async(req , res)=>{
   try {
       const user = await USER.findById(req.payload._id).select("-password")
       res.status(200).json({
        message:"user fetched succesfully" , 
        user : user 
       })
    }catch (error) {
        res.status(500).json({
        message:"internal server error",
        error : error.message
       })
   }
})

router.put("/profile/password" ,jwttoken, async(req , res)=>{
     try {
        const userid = req.payload._id

     const {currentpassword , newpassword} = req.body
     if(!currentpassword || !newpassword){
        return res.status(404).json({message:"currentpassword or newpassword is required"})
     }

    const user = await USER.findById(userid)
    if(!user){
         return res.status(404).json({message:"user not found"})
    }

    const isMatch = await bcrypt.compare(currentpassword , user.password)
    if(!isMatch){
       return res.status(404).json({message:"password is not correct"})
    }

    const hasshedpassword = await hashedpassword(newpassword , 10)
    user.password = hasshedpassword
    await user.save()
     return res.status(401).json({
                  message: "password is changed succesfully"})
     } catch (error) {
        return res.status(500).json({
                  message: "internal server error " , error : error.message})
     }

})

module.exports = router