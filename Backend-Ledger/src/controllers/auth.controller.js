const userModel = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcryptjs")

const register=async(req,res)=>{
    const {email,name,password} = req.body

    const isAlreadyExist=await userModel.findOne({email})
    if(isAlreadyExist){
        return res.status(422).json({
            message:"User already exists with email",
            status:"failed"
        })
    }

    const user=await userModel.create({
        email,
        name,
        password,
    })

    const token=jwt.sign({
        _id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"3d"})


    res.cookie("token",token)

    return res.status(201).json({
        message:"User registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
        },
        token
    })
}

const login=async(req,res)=>{
    const {email,password} = req.body
    const user=await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Email or Password is INVALID"
        })
    }

    const correctPassword=await user.comparePassword(password,user.password)
    if(!correctPassword){
        return  res.status(401).json({
            message:"Email or Password is INVALID",
            status:"failed"
        })
    }

    const token=jwt.sign({
        _id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

module.exports={
    register,
    login
}