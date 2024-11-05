const express = require('express')
const userRouter = express.Router();
const { signIn, signUp, logOut, protected } = require('../controller/AuthController');
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

module.exports = userRouter;