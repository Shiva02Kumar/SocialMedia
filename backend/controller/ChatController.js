const { json } = require('body-parser');
const userModel = require('../models/authDB');
const chatModel = require('../models/ChatModel')
const messageModel = require('../models/MessageModel')

async function userChats(req, res) {
    try {
        const user = req.user;
        // console.log(user)
        const chats = await chatModel.find({ users: { $elemMatch: { $eq: user._id } } })
            .populate('users', '-password')
            .populate('groupAdmins', '-password')
            .populate('latestMessage')
            .populate({
                path: 'latestMessage',
                populate: {
                    path: 'sender',
                    select: 'name email pic'
                }
            }).sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Chats retrieved successfully',
            data: chats,
        });

    } catch (error) {
        console.error('Error fetching user chats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

async function accessChat(req, res) {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: 'UserID not recieved'
            })
        }
        // console.log("hey")
        const chat = await chatModel.findOne({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userID } } }
            ],
        })
            .populate('users', '-password')
            .populate('latestMessage')
            .populate({
                path: 'latestMessage',
                populate: {
                    path: 'sender',
                    select: 'name email pic'
                }
            })
        if (chat) {
            res.status(200).json({
                success: true,
                message: 'Chats retrieved successfully',
                data: chat,
            });
        }
        else {
            const chatData = {
                chatName: 'sender',
                isGroupChat: false,
                users: [req.user._id, userID]
            }
            const newChat = await chatModel.create(chatData);
            const createdChat = await chatModel.findById(newChat._id).populate('users', '-password')
            res.status(201).json({
                success: true,
                message: 'Chat Created successfully',
                data: createdChat,
            });
        }
    } catch (error) {
        console.error('Error fetching user chats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

async function createGroupChat(req, res) {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).json({
                success: false,
                message: "Empty Fields"
            });
        }

        const users = JSON.parse(req.body.users);

        if (users.length < 2) {
            return res.status(400).json({
                success: false,
                message: "More than 2 Users required to form a group"
            });
        }
        if (!users.find((user) => user._id === req.user._id)) {
            users.push(req.user);
        }

        const groupChat = await chatModel.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const fullGroupChat = await chatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json({
            success: true,
            message: "Group Chat Created",
            chat: fullGroupChat
        })
    } catch (error) {
        console.log("Error creating group chat", error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

async function renameGroup(req, res) {
    try {
        const { chatID, chatName } = req.body;

        if (!chatID || !chatName) {
            return res.status(400).json({
                success: false,
                message: "chatID and chatName are required",
            });
        }

        const updateGroup = await chatModel.findByIdAndUpdate(
            chatID,
            { chatName },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updateGroup) {
            return res.status(404).json({
                success: false,
                message: "Group Chat Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Group Chat Updated",
            chat: updateGroup
        })

    } catch (error) {
        console.log("Error in renaming Group Chat:", error);;
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

async function addUserToGroup(req, res) {
    try {

        const { chatID, userID } = req.body;
        if (!chatID || !userID) {
            return res.status(400).json({
                success: false,
                message: "chatID and userID are required",
            });
        }
        const updateGroup = await chatModel.findByIdAndUpdate(
            chatID,
            { $push: { users: userID } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updateGroup) {
            return res.status(404).json({
                success: false,
                message: "Group Chat Not Found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Group Chat Updated",
                chat: updateGroup
            })
        }
    } catch (error) {
        console.log("Error adding user to group:", error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

async function removeUserFromGroup(req, res) {
    try {

        const { chatID, userID } = req.body;
        if (!chatID || !userID) {
            return res.status(400).json({
                success: false,
                message: "chatID and userID are required",
            });
        }
        const updateGroup = await chatModel.findByIdAndUpdate(
            chatID,
            { $pull: { users: userID } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updateGroup) {
            return res.status(404).json({
                success: false,
                message: "Group Chat Not Found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Group Chat Updated",
                chat: updateGroup
            })
        }
    } catch (error) {
        console.log("Error adding user to group:", error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = { userChats, accessChat, createGroupChat, renameGroup, addUserToGroup, removeUserFromGroup }