const adminmidlewear = (req , res , next)=>{
    console.log(req.payload)
     if(req.payload.role !=="admin"){
        return res.status(404).json({message:"only admin add product"})
    }
    next()
};
module.exports = adminmidlewear