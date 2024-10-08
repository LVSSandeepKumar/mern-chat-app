import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);
        console.log(`MongoDb connected, ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting db, ${error.message}`);
        process.exit(1);
    }
}