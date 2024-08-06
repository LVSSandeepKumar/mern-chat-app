import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res) => {
    try {
        //Fetch the logged in user id from request
        const userId = req.user._id;
        //Filter the users excluding the logged in user
        const filteredUsers = await User.find({ _id: { $ne : userId }}).select("-password");
        //Return the users back to frontend
        return res.status(200).json(filteredUsers);
    } catch (error) {
        //Error handling
        console.log(`Error in getUsersForSidebar controller, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}