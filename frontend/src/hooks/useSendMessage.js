import { useState } from "react";
import {toast} from "react-hot-toast";

import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  //Define loading state
  const [loading, setLoading] = useState(false);
  //Get message states from zustand's useConversation() hook
  const {messages, setMessages, selectedConversation} = useConversation();
  //Send Message function 
  const sendMessage = async(message) => {
    setLoading(true);
    try {
        //API request and response data
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message})
        })
        const data = await res.json();
        //In case of error throw the error
        if(data.error) throw new Error(data.error);
        //Update messages state 
        setMessages([...messages, data]);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }
  //Return the loading state and send Message function from the hook
  return {loading, sendMessage};
}

export default useSendMessage