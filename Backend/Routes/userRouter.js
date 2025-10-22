import express from "express"
import { loginController, logoutController, registerController, userProfile } from "../Controllers/userController.js"
import { body } from "express-validator"
import userAuth from "../Middleware/userMiddleware.js"
const userRoute = express.Router()

userRoute.post("/register",
    [
        body("fullName.firstName").notEmpty().isLength({min : 3}).withMessage("First name is required"),
        body("email").notEmpty().isEmail().withMessage("e-mail should be Valid"),
        body("password").notEmpty().isLength({min : 6}).withMessage("password should be at least 6 length")
    ]
    ,registerController)


userRoute.post("/login",
    [
        body("email").notEmpty().isEmail().withMessage("e-mail should be Valid"),
        body("password").notEmpty().isLength({min : 6}).withMessage("password should be at least 6 length")
    ]
    ,loginController)

    
userRoute.get("/profile",userAuth,userProfile)
    
userRoute.get("/logout",logoutController)

export default userRoute