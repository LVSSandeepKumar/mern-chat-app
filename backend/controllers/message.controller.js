import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res) => {
    try {
        //Read the message, senderId and receiverId from request
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        //Check for conversations between sender and receiver in our db
        let conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]}
        })
        //If there is no conversation, create one
        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        //Create new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        //Once message is created, push it to the conversation
        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //Save both conversation and message
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        //Return the message to frontend
        return res.status(200).json(newMessage);
    } catch (error) {
        //Error handling
        console.log(`Error in sendMessage controller, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessages = async(req,res) => {
    try {
        //Fetch senderId and receiverId from request
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        //Check for the conversation between sender and receiver
        const conversation = await Conversation.findOne({ 
            participants: {$all: [senderId, receiverId]}
        })
        .populate("messages");
        if(!conversation) {
            return res.status(200).json([]);
        }
        //Return the messages to frontend
        const messages = conversation.messages;
        return res.status(200).json(messages);
    } catch (error) {
        //Error handling
        console.log(`Error in getMessages controller, ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}