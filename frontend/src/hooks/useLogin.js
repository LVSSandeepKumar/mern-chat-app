import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    //Define loading states and auth context
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    //Login function
    const login = async(username, password) => {
        setLoading(true);
        try {
            //API request and response data
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            })
            const data = await res.json();
            //In case of error, throw the error to catch block
            if(data.error) throw new Error(data.error);
            //Update local storage and auth context
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, login}
}

export default useLogin