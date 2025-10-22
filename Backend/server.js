import dotenv from "dotenv";
dotenv.config();
import {app} from "./index.js";
import http from"http";
import {connectToDb} from "./db.js"

const PORT = Number(process.env.PORT)|| 8000;
const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log("Server is running on port ",PORT)
    connectToDb();
})
