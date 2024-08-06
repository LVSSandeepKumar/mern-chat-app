import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    //Check if the user has provided all the credentials and fetch them from request body
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!(fullName && username && password && confirmPassword && gender)) {
      return res
        .status(400)
        .json({ error: "Please provide all the credentials" });
    }
    //Check if the password is of desired length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be minimum 6 characters long" });
    }
    //Check if the password and confirm Password are same
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password must be same" });
    }
    //Check if the username is taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    //If all the validation checks are passed, hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Define new profile pictures for boys and girls
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    //Create new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    //Generate a token and set it to cookie
    generateTokenAndSetCookie(newUser._id, res);
    //Save the new user to db
    await newUser.save();
    //Return the user without password to frontend
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    //Error handling
    console.log(`Error in signup controller, ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    //Check if user entered both password and username and read them from request body
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .json({ error: "Please provide both username and password" });
    }
    //Check if there is any user with that username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No user found, check the username or visit signup" });
    }
    //Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ error: "Incorrect password" });
    }
    //Generate token and set cookie for login session
    generateTokenAndSetCookie(user._id, res);
    //Return the user without password to frontend
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    //Error handling
    console.log(`Error in login controller, ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    //Clear the cookie and send response to client
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    //Error handling
    console.log(`Error in logout controller, ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
