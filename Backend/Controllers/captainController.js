import { validationResult } from "express-validator"
import captainModel from "../Models/captainModel.js"
import blackListTokenModel from "../Models/blackListTokenModel.js"

const registerController = async (req,res)=>{
    console.log(req.body)
    try {
    const firstName = req.body?.fullName?.firstName
    const lastName = req.body?.fullName?.lastName
    const { email, password, status, vehicle = {}, location = {} } = req.body
    const { color, plate, capacity, type } = vehicle
    const { latitude, longitude } = location
    console.log(firstName, lastName, email, password, status, { color, plate, capacity, type }, { latitude, longitude })
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            return res.status(400).json(errors.array())
        }

        const checkCaptain = await captainModel.findOne({ email })

        if (checkCaptain) return res.status(400).json({ message: "e-mail already registered" })

        const hashPassword = await captainModel.hashPassword(password)
        const captain = await captainModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password: hashPassword,
            status,
            vehicle: {
                color,
                plate,
                capacity,
                type
            },
            location: {
                latitude,
                longitude
            }
        })

        const token = await captain.createJwtToken()
        console.log(token)

        res.cookie("token", token)

        const captainObj = captain.toObject()
        delete captainObj.password


        return res.status(201).json({token,captainObj})

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const loginController = async (req,res)=>{
    const {email,password} = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const captain = await captainModel.findOne({ email }).select("+password")

        if (!captain) return res.status(400).json({ message: "! invalid e-mail" })

        const isMatch = await captain.comparePasswords(password)

        if (!isMatch) return res.status(400).json({ message: "! invalid Password" })

        const token = await captain.createJwtToken()
        console.log(token)

        res.cookie("token", token)

        const captainObj = captain.toObject()
        delete captainObj.password

        return res.status(201).json({token,captainObj})



    } catch (error) {
        return res.status(500).json({message : "error while login",error})
    }
}


const logoutController = async (req, res) => {
    try {
        const token = req.cookies?.token;
        console.log(token)
        res.clearCookie("token");
        if(!token) return res.status(200).json({ message: "Logged out", token });

        const blackListToken = await blackListTokenModel.create({token})


        return res.status(201).json({ message: "Logged out", token });

    } catch (error) {
        return res.status(400).json({ message: "log out failed",error });
    }
}


const captainProfile = async(req,res)=>{
    try {
        const captain = req.captain
        console.log(captain)    
        return res.status(201).json(captain)
    } catch (error) {
        return res.status(400).json({ message: "captain Profile not found",error });
    }
}

export {registerController,loginController,logoutController,captainProfile}