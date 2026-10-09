const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
 
const connectDB = require("./minidb")
const userRoutes = require("./Routes/userRoutes")
const productRoutes = require("./Routes/productRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const cartRoutes = require("./Routes/cartRoutes")

 const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use("/user",userRoutes)
app.use("/product" , productRoutes)
app.use("/orders" , orderRoutes)
app.use("/carts" ,cartRoutes)

const PORT = process.env.PORT || 4007
const satrtserver = async()=>{
 await connectDB()
 app.listen(PORT , ()=>{
     console.log("connet")
 })
}

satrtserver()