const express =require("express")
const router = express.Router()

const ORDER = require("../Models/orderSchema")
const PRODUCT = require("../Models/productSchema")
const {jwttoken} = require("../Jwt/Jwt")   

router.post("/orders", jwttoken, async (req, res) => {
    try {
        const { items } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order is not received"
            });
        }
        let totalAmount = 0;
        for (const item of items) {
            const product = await PRODUCT.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    message: "Product is not available"
                });
            }
            const quantity = item.quantity || 1;
            totalAmount += product.price * quantity;
        }
        const order = {
            ...req.body,
            coustomer: req.payload._id,
            totalAmount: totalAmount
        };
        const neworder = new ORDER(order);
        const response = await neworder.save();
        res.status(201).json({
            message: "Order successfully",
            response: response
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

router.get("/my-orders",jwttoken , async(req , res)=>{
      try {
        const orders = await ORDER.find({coustomer:req.payload._id})
      if(!orders){
        return res.status(404).json({message:"no orders"})
      }
      res.status(201).json({message:"order is : ", orders:orders})
      } catch (error) {
        res.status(500).json({message:"internal server error " , error:error.message})
      }
})
router.delete("/order-cancel" ,jwttoken, async(req , res)=>{
     try { 
        const { orderID } = req.body
        if(!orderID){
            return res.status(400).json({
                message:"order_ID is required"
            }) 
        }
         const order = await ORDER.findOne( {
            orderID:orderID,
            coustomer:req.payload._id
         })
         if(!order){
            return res.status(404).json({
                  message:"order is not found"  
            })
        }
        if(order.orderStatus == "delivered"){
            return res.status(200).json({
                message:"order is delivered not cancell after"
            })
        }
         if(order.orderStatus == "cancelled"){
            return res.status(200).json({
                message:"order is delivered not cancell after"
            })
        }
        order.orderStatus = "cancelled"
        await order.save()
        res.status(200).json({
            message:"order is cancel : ",
            order:order
        })

     } catch (error) {  
          res.status(200).json({
            message:"internal server error : ",
            error:error.message
        })
     }
})


module.exports = router