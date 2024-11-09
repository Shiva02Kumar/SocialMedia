const express = require('express')
const userRouter = express.Router();
const { signIn, signUp, logOut, protected, searchUsers, addDummyUsers } = require('../controller/AuthController');
const { signInValidation, signUpValidation, authenticate, upload } = require('../middlewares/AuthMiddleware');

userRouter
    .route('/signin')
    .post(signInValidation, signIn)

userRouter
    .route('/signup')
    .post(upload.single('pic'), signUpValidation, signUp)

userRouter
    .route('/logout')
    .post(logOut)

userRouter
    .route('/protected')
    .get(authenticate, protected)

userRouter
    .route('/user')
    .get(authenticate, searchUsers)

userRouter
    .route('/dummyUser')
    .post(addDummyUsers)

module.exports = userRouter;