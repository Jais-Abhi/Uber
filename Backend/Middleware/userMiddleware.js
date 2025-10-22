import blackListTokenModel from "../Models/blackListTokenModel.js"
import UserModel from "../Models/userModel.js"

const userAuth = async (req,res,next)=>{
    try {
        const token = req?.cookies?.token
        if(!token) return res.status(400).json({message : "unauthorized access"})

        const isBlackList = await blackListTokenModel.findOne({token})

        if(isBlackList) return res.status(400).json({message : "login again"})

        const userId = await UserModel.verifyToken(token)
        const user = await UserModel.findById(userId)
        if (!user) return res.status(400).json({message : "unauthorized access"})

        req.user = user

        next()

    } catch (error) {
        return res.status(400).json({message : "unauthorized access",error})
    }
}

export default userAuth