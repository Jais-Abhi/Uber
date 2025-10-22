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
        expires : 3600  //delete token after 1 hour
    }
})

//86400 - 1day
const blackListTokenModel = mongoose.model("blackListTokenModel",blackListTokenSchema)

export default blackListTokenModel