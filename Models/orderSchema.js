const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
   coustomer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   items:[
    {
        product:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"product",
           required:true
        },
        name:{
            type:String,
            required:true
        },
        price:{
           type:Number,
           min: 0,
           required:true
        },
        image:{
            type:String,
            required:true
        },
       quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    shippingaddress:{
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: {
        type: String,
        default: "India",
      },
    },
    },
     paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
      orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
   totalAmount: {
  type: Number,
  required: true,
  default: 0
}


},
{
  timestamps:true,  
})
const order = mongoose.model("order" , orderSchema)
module.exports = order