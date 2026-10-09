const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGODB_URL

const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("server is connected")
    } catch (error) {
          console.log("server is not  connected : " , error)
    }
}

module.exports = connectDB