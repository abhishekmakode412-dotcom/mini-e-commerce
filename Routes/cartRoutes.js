const express = require("express")
const router = express.Router()

const CART = require("../Models/cartSchema")
const PRODUCT = require("../Models/productSchema")
const {jwttoken} = require("../Jwt/Jwt")

router.post("/add-to-cart", jwttoken , async(req , res)=>{
 try {
       const { productID } = req.body
       if(!productID){
        return res.status(400).json({
            message:"product_ID is required"
        })
       }
    const product = await PRODUCT.findById({
        productID:productID,
        coustomer:req.payload._id
    })
    if(!product){
        return res.status(404).json({message:"product is not available"})
    }
    let cart = await CART.findOne({
        coustomer: req.payload._id
     });
     if(!cart){
         cart = new CART({
        coustomer: req.payload._id,
        items: []
        });
     }
     cart.items.push({
       name:product.name,
       price:product.price,
       image:product.image,
       stock:product.stock
    })
    const response = await cart.save()
    res.status(201).json({
        message:"cart add is succesfully",
         response:response
        })
 } catch (error) {
     res.status(500).json({
        message:"internall server error ",
        error:error.message
        })
    }
})


router.get("/showall-cart-products" , jwttoken , async(req , res)=>{
   try {
    const getcart = await CART.find({coustomer : req.payload._id})
    if(!getcart){
        return res.status(404).json({
            message:"cart is not added"
        })
    }
    res.status(201).json({
        message:"carts is found", 
        getcart:getcart
    })
   } catch (error) {
     res.status(500).json({
        message:"internal server error : ", 
       error : error.message
    })
   }  
})


// delete all product from cart section
router.delete("/removeall-products",jwttoken, async(req , res)=>{
  try {
     const deletecart = await CART.deleteMany({ coustumer : req.payload._id})
     if(!deletecart){
       return res.status(404).json({
            message:"cart is blank",
            })
       }
    res.status(201).json({
         message:"delete is successfully", 
   })
  }catch (error) {
    res.status(500).json({
        message:"internally server is error : ", 
        error : error.message
       })
    }
})



//delete a random product in cart section
router.delete("/removerandom-products",jwttoken, async(req , res)=>{
  try {
    const {cartID }= req.body
    const deletecart = await CART.findOneAndDelete({
        _id:cartID,
         coustomer:req.payload._id
    })
    if(!deletecart){
       return res.status(404).json({
            message:"this product is not add in cart"
        })
    }
    res.status(201).json({
         message:"delete is successfully", 
   })
  }catch (error) {
    res.status(500).json({
        message:"internally server is error : ", 
        error : error.message
       })
    }
})

module.exports = router;