import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {

  const [message, setMessage] = useState("");

  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async(e) => {
    e.preventDefault();
    //If message is empty return out of the function
    if(!message) return;
    await sendMessage(message);
    //Set message to be an empty string again
    setMessage("");
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="text-sm border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-white"
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner"></span> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
