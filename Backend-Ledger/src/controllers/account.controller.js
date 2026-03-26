const accountModel = require("../models/account.model.js")


const createAccount = async(req,res)=>{
    try{
        const user = req.user
        const isAccountExist = await accountModel.findById(user._id)
        
        if(isAccountExist){
            return res.status(400).json({
                message:"Account already exists"
            })
        }


        const account = await accountModel.create({
            user:user._id
        })

        return res.status(200).json({
            message:"Account Created",
            account
        })
    }catch(err){
        return res.status(500).json({
            message:"Something went wrong in account creation"
        })
    }
}


module.exports={
    createAccount
}