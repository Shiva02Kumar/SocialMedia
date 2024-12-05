const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
    },
    groupAdmins: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true
});

const chatModel = mongoose.model('Chats', chatSchema);

module.exports = chatModel;