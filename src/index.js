// require("dotenv").config({path:'./env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./constants.js";



dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.on("error",error=>{
        console.error("server error",error);
        throw error;
    })
    app.listen(PORT,()=>{
        console.log(`Server is running at: http://localhost:${PORT}`)
    })
})
.catch(error=>{
    console.log("Mongo DB connection failed !!",error)
})















/**
 * 
 * import express from "express";
const app = express();

(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log(error);
        throw error;
       })
       app.listen(process.env.PORT,()=>{
        console.log(`http://localhost:${process.env.PORT}`)
       })
    } catch (error) {
        console.error("Error",error);
        throw error;
    }
})()

 */