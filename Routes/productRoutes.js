const express = require("express")
const router = express.Router()
const multer = require("multer")

const PRODUCT = require("../Models/productSchema")
const {jwttoken} = require("../Jwt/Jwt")
const adminmidlewear = require("../Middlewear/adminmidlewear")
const updatemidlewear = require("../Middlewear/updatemidlewear")
const deletemidlewear = require("../Middlewear/deletemidlewear")

const storage = multer.diskStorage({
   destination:(req , file , cb)=>{
        cb(null , "uploads/" )
   },
   filename:(req , file , cb)=>{
     cb(null , Date.now()+"-"+file.originalname)
   }
})
const uploads = multer({storage})

router.post("/addproduct" , jwttoken, adminmidlewear , uploads.single("image"), async(req , res)=>{
  try{
   const product  =  {...req.body , image : req.file.filename}
   const newproduct = new PRODUCT(product)
   const response = await newproduct.save()
   res.status(202).json({
    message:"saved successfully : ",
    response:response
   })
  }catch(error){
       res.status(500).json({
    message:"internall server error: ",
    error : error.message
   })
  }
})

router.get("/viewproduct" , async(req , res)=>{
 try {
     const viewproduct = await PRODUCT.find()
    if(!viewproduct){
      return res.status(404).json({message:"Product is not found "})
    }
    res.status(201).json({message:"Product is found : " , 
      viewproduct : viewproduct})
 } catch (error) {
    res.status(500).json({message:"internal server error : " , 
      error:error.message
    })
 }
})

   router.get("/viewproduct/:id" , async(req , res)=>{
 try {
     const id = req.params.id
     const response = await PRODUCT.findById(id)
     if(!response){
      return res.status(404).json(
        {
        message:"product is not found"
        }
      )}
    res.status(200).json({
      message:"product is found : ",
       response : response
      })

 } catch (error) {
    res.status(500).json({message:"internal server error : " , 
      error:error.message
    })
 }
})

   router.put("/viewproduct/:id", jwttoken, updatemidlewear , async(req , res)=>{
  try {
      const id = req.params.id 
      const updateproduct = await PRODUCT.findByIdAndUpdate(id , req.body,{new:true})
      if(!updateproduct){
      return res.status(404).json({
        message:"product is not found for update"
      })
    }
     return res.status(404).json({
      message:"product is update succesfully", 
      updateproduct:updateproduct
    })
 } catch (error) {
   return res.status(500).json({
    message:"internall server error : " ,
     error:error.message
  })
 }
})

   router.delete("/viewproduct/:id", jwttoken, deletemidlewear , async(req , res)=>{
  try {
      const id = req.params.id 
    const deleteproduct = await PRODUCT.findByIdAndDelete(id)
    if(!deleteproduct){
      return res.status(404).json({
        message:"product is not found for delete"
      })
    }
     return res.status(200).json({
      message:"product is delete succesfully"
     })
 } catch (error) {
   return res.status(500).json({
    message:"internall server error : ", 
    error:error.message
  })   
 }
})
module.exports = router