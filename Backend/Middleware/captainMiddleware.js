import blackListTokenModel from "../Models/blackListTokenModel.js"
import captainModel from "../Models/captainModel.js"
const captainAuth = async (req,res,next)=>{
    try {
        const token = req?.cookies?.token
        if(!token) return res.status(400).json({message : "unauthorized access"})
            console.log(token)
        const isBlackList = await blackListTokenModel.findOne({token})
        console.log(isBlackList)
        if(isBlackList) return res.status(400).json({message : "login again"})

        const captainId = await captainModel.verifyToken(token)
        console.log(captainId)
        const captain = await captainModel.findById(captainId)
        console.log(captain)
        if (!captain) return res.status(400).json({message : "unauthorized access"})

        req.captain = captain

        next()

    } catch (error) {
        return res.status(400).json({message : "unauthorized access in error",error})
    }
}

export default captainAuth