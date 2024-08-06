import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  // Define loading and message states
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    //Function to get messages
    const getMessages = async () => {
      setLoading(true);
      try {
        //API request and response data
        const res = await fetch(`/api/messages/${selectedConversation?._id}`);
        const data = await res.json();
        //In case of error, throw the error
        if (data.error) throw new Error(data.error);
        //Update the messages
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if(selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  //Return the messages and loading state out of the hook
  return { loading, messages };
};

export default useGetMessages;
