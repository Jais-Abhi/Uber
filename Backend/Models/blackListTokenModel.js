import mongoose from "mongoose"

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type : String,
        required : true,
        unique:true
    },
    createdAt:{
        type : Date,
        default : Date.now,
        expires : 60
    }
})

//86400 - 1day
const blackListTokenModel = new mongoose.model("blackListTokenModel",blackListTokenSchema)

export default blackListTokenModel