const express = require('express');
const { authenticate } = require('../middlewares/AuthMiddleware');
const { sendMessage, allMessages } = require('../controller/MessageController');
const messageRouter = express.Router()

messageRouter
    .route('/')
    .post(authenticate, sendMessage)

messageRouter
    .route('/:chatID')
    .get(authenticate, allMessages  )


module.exports = messageRouter;