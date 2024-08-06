import { useEffect, useState } from "react"
import toast, {} from "react-hot-toast";

const useGetConversations = () => {
    //Define loading and conversation states
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    //Use use effect to fetch data
    useEffect(() => {
        // Get Conversations function
        const getConversations = async () => {
            setLoading(true);
            try {
                //API request and response data
                const res = await fetch("/api/users");
                const data = await res.json();
                //In case of error, throw the error
                if(data.error) throw new Error(data.error);
                setConversations(data);
                console.log(conversations);
            } catch (error) {
                toast.error(error.message);
                setConversations([]);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, [])

    return {loading, conversations}
}

export default useGetConversations;