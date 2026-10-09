const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    coustumer :{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
             },
            image: {
                type: String,
                required: true,
             },
            stock: {
                type: Number,
                required: true,
                min: 0,
                default: 0,
             },
            rating: {
                type: Number,
                default: 0,
            }

        }
    ]
},{
    timestamps:true,
})
const cart = mongoose.model("cart" , cartSchema)
module.exports = cart