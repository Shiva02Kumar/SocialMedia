const userModel = require("../models/authDB");
const chatModel = require("../models/ChatModel");
const messageModel = require("../models/MessageModel");

async function sendMessage(req, res) {
    try {
        const { chatID, content } = req.body;
        if (!chatID || !content) {
            return res.status(400).json({
                success: false,
                message: "chatID and content are required",
            });
        }
        const newMessageData = {
            sender: req.user._id,
            content,
            chat: chatID,
        };
        let newMessage = await messageModel.create(newMessageData);
        newMessage = await newMessage.populate("sender", "name pic")
        newMessage = await newMessage.populate("chat")

        newMessage = await userModel.populate(newMessage, {
            path: "chat.users",
            select: "name pic email"
        });
        await chatModel.findByIdAndUpdate(chatID, {
            latestMessage: newMessage,
        });
        res.status(200).json({
            success: true,
            message: "Message Sent",
            data: newMessage
        })
    } catch (error) {
        console.log("Error Sending Message:", error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

async function allMessages(req, res) {
    try {
        const allMessages = await messageModel.find({chat: req.params.chatID})
        .populate("sender", "name pic email")
        .populate("chat");
        res.status(200).json({
            success: true,
            message: "All Messages Found",
            data: allMessages
        })
    } catch (error) {
        console.log("Error Finding Message:", error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = { sendMessage, allMessages }