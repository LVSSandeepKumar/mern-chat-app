import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import { ENV_VARS } from "./utils/envVars.js";
import { connectDB } from "./utils/connectDB.js";
import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

const PORT = ENV_VARS.PORT;

const __dirname = path.resolve(); 
// middleware functions
app.use(express.json()); // to parse incoming requests with JSON payloads
app.use(cookieParser()); // to read cookies from request headers 

app.use(express.static(path.join(__dirname, "/frontend/dist"))); // to use dist folder in frontend as static file

// routes for various utilities
app.use("/api/auth", authRoutes);        // authentication routes
app.use("/api/messages", messageRoutes); // message routes
app.use("/api/users", userRoutes);       // user routes

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});