import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  //Define loading states and auth context
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  //Logout function
  const logout = async () => {
    setLoading(true);
    try {
      //API request and response data
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      //Reset the local storage and update auth context
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
