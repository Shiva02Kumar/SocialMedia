const express = require('express');
const { userChats, accessChat, createGroupChat, renameGroup, addUserToGroup, removeUserFromGroup } = require('../controller/ChatController');
const { authenticate } = require('../middlewares/AuthMiddleware');
const chatRouter = express.Router();

chatRouter
    .route('/userChats')
    .get(authenticate, userChats)
    .post(authenticate, accessChat)

chatRouter
    .route('/group')
    .post(authenticate, createGroupChat)

chatRouter
    .route('/renameGroup')
    .put(authenticate, renameGroup)

chatRouter
    .route('/addUserToGroup')
    .put(authenticate, addUserToGroup)

chatRouter
    .route('/removeUserFromGroup')
    .put(authenticate, removeUserFromGroup)

module.exports = chatRouter;