const bcrypt = require("bcrypt")

const hash = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const  hashpassword = await bcrypt.hash(password , salt)
    return hashpassword
}
module.exports = hash 