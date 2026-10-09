const updatemidlewear = (req , res , next)=>{
    console.log(req.payload)
     if(req.payload.role !=="admin"){
        return res.status(404).json({message:"Only Admin Update Product"})
    }
    next()
};
module.exports = updatemidlewear