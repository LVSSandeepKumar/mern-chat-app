export const sendMessage = async(req,res) => {
    try {
        
    } catch (error) {
        //Error handling
        console.log(`Error in sendMessage controller, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}