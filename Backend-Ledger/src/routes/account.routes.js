const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware.js")
const accountController = require("../controllers/account.controller.js")

const accountRouter = Router()

accountRouter.post("/",authMiddleware.authMiddleware,accountController.createAccount)

module.exports = accountRouter