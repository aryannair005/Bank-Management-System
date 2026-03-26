const userModel = require("../models/user.model.js")
const jwt = require("jsonwebtoken")


const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access , token is missing",
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        req.user = user 
        
        return next()
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized access , token is Invalid"
        })
    }
}

module.exports= {
    authMiddleware
}