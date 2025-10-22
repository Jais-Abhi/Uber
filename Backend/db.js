import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose"

const atlasUrl = process.env.ATLAS_URL;

export const connectToDb = ()=>{
    mongoose.connect(atlasUrl)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch((err)=>{
        console.log(err.message)
    })
}
