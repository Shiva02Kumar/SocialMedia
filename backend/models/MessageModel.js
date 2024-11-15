const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats'
    },
}, {
    timestamps: true
});

const messageModel = mongoose.model('Messages', messageSchema);

module.exports = messageModel;