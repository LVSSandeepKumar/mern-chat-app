import express from "express";
import cookieParser from "cookie-parser";

import { ENV_VARS } from "./utils/envVars.js";
import { connectDB } from "./utils/connectDB.js";
import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

const PORT = ENV_VARS.PORT;

// middleware functions
app.use(express.json()); // to parse incoming requests with JSON payloads
app.use(cookieParser()); // to read cookies from request headers 

// routes for various utilities
app.use("/api/auth", authRoutes);        // authentication routes
app.use("/api/messages", messageRoutes); // message routes
app.use("/api/users", userRoutes);       // user routes

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});