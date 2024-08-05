import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  //Create loading states with useState
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  //Signup function
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    //Validate inputs and return out of function in case of any error
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    
    //In case of success, use try-catch block for API operation
    try {
        //API request and response data
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({fullName, username, password, confirmPassword, gender})
        });
        const data = await res.json();
        //In case of error, throw the error for catch block
        if(data.error) throw new Error(data.error);
        //Update Local Storage and Auth Context
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };
  return {loading, signup}
};



//Function to validate inputs
function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  //Check if all fields are filled
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  }
  //Check if passwords are matching
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  //Check if passwords are of minimum length
  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters long");
    return false;
  }
  //If all validation checks are passed, return true
  return true;
}

export default useSignup;
