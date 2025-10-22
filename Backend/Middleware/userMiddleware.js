import UserModel from "../Models/userModel.js"

const userAuth = async (req,res,next)=>{
    try {
        const token = req?.cookies?.token
        console.log(token)
        if(!token) return res.status(400).json({message : "unauthorized access of token"})
        console.log("token")
        const userId = await UserModel.verifyToken(token)
        console.log(userId)
        const user = await UserModel.findById(userId)
        console.log(user)
        if (!user) return res.status(400).json({message : "unauthorized access user"})

        req.user = user

        next()

    } catch (error) {
        return res.status(400).json({message : "unauthorized access while verifying token",error})
    }
}

export default userAuth