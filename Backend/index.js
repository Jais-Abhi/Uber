import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import userRoute from "./Routes/userRouter.js";
import cookieParser from "cookie-parser";
import captainRoute from "./Routes/captainRoute.js";


const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})


app.use("/api/auth/user",userRoute)
app.use("/api/auth/captain",captainRoute)
export  {app}