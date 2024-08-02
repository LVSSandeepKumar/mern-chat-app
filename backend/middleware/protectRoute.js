import jwt from "jsonwebtoken";
import { ENV_VARS } from "../utils/envVars.js";
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next) => {
    try {
        //Check if the user has a token in their request cookies and fetch it
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(403).json({ error: "Unauthorized, no token found" });
        }
        //Decode the token with JWT_SECRET we have
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if(!decoded) {
            return res.status(403).json({ error: "Unauthorized, invalid token" });
        }
        //Check for the user with the userId for which the token is assigned
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        //Set the request user as our database user for better accessibility throughout the client-side application
        req.user = user;
        next();
    } catch (error) {
        //Error handling
        console.log(`Error in protectRoute Middleware, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}