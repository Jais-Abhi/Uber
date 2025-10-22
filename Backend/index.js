import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import userRoute from "./Routes/userRouter.js";
import cookieParser from "cookie-parser";


const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})


app.use("/api/auth/user",userRoute)

export  {app}