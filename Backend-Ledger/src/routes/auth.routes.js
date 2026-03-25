const {Router} = require("express")

const authRouter=Router()
const authController = require("../controllers/auth.controller.js")


authRouter.post("/login",authController.login)
authRouter.post("/register",authController.register)


module.exports=authRouter