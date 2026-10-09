const deletemidlewear = (req , res , next)=>{
    console.log(req.payload)
     if(req.payload.role !=="admin"){
        return res.status(404).json({message:"Only Admin Delete Product"})
    }
    next()
};
module.exports = deletemidlewear