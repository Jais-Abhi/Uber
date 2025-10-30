import { validationResult } from "express-validator"
import UserModel from "../Models/userModel.js"
import blackListTokenModel from "../Models/blackListTokenModel.js"

const registerController = async (req,res)=>{
    console.log(req.body)
    try {
        const firstName = req.body.fullName.firstName
        const lastName = req.body.fullName.lastName
        const email = req.body.email
        const password = req.body.password
        console.log(firstName,lastName,email,password)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            return res.status(400).json(errors.array())
        }

        const checkUser = await UserModel.findOne({email})

        if(checkUser) return res.status(400).json({message:"e-mail already registered"})

        const hashPassword = await UserModel.hashPassword(password)
        const user = await UserModel.create({
            fullName : {
                firstName,
                lastName
            },
            email,
            password : hashPassword
        })

        const token = await user.createjwtToken()
        console.log(token)

        res.cookie("token",token)
        // localStorage.setItem("token", token)

        const userObj = user.toObject()
        delete userObj.password


        return res.status(201).json({token,userObj})

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const loginController = async (req,res)=>{
    const {email,password} = req.body
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }

        const user = await UserModel.findOne({email}).select("+password")

        if (!user) return res.status(400).json({message: "! invaild e-mail" })

        const isMAtch = await user.comparePassword(password)

        if(!isMAtch) return res.status(400).json({message : " ! invalid Password"})

        
        const token = await user.createjwtToken()
        console.log(token)
        
        res.cookie("token",token)
        // localStorage.setItem("token", token)

        const userObj = user.toObject()
        delete userObj.password

            
        return res.status(201).json({token,userObj})



    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const logoutController = async (req, res) => {
    try {
        const token = req.cookies?.token;
        console.log(token)
        res.clearCookie("token");
        // localStorage.removeItem("token");

        if(!token) return res.status(200).json({ message: "Logged out", token });

        const blackListToken = await blackListTokenModel.create({token})


        return res.status(201).json({ message: "Logged out", token });

    } catch (error) {
        return res.status(400).json({ message: "log out failed",error });
    }
}


const userProfile = async(req,res)=>{
    try {
        const user = req.user
        console.log("Current User",user)    
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({ message: "userProfile not found",error });
    }
}

export {registerController,loginController,logoutController,userProfile}