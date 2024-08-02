import express from "express";
import cookieParser from "cookie-parser";

import { ENV_VARS } from "./utils/envVars.js";
import { connectDB } from "./utils/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

// middleware functions
app.use(express.json()); // to parse incoming requests with JSON payloads
app.use(cookieParser()); // to read cookies from request headers 

// routes for various utilities
app.use("/api/auth", authRoutes); // authentication routes
app.use("/api/messages", messageRoutes); // message routes

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});