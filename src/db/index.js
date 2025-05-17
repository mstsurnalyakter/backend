import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () =>{
    try {
     const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
     console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    //  console.log("connectionInstance:",connectionInstance)
    } catch (error) {
        console.error("MongoDB Connection Failed:",error);
        process.exit(1);
    }
}

export default connectDB;