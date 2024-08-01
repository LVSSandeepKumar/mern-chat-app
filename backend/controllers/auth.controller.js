export const login = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(`Error in login controller, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const signup = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(`Error in signup controller, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(`Error in logout controller, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

