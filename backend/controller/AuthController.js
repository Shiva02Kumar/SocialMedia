const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../models/authDB");

async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(409)
                .json({
                    message: "Invalid credentials",
                    error: "Invalid credentials",
                    success: false
                });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403)
                .json({
                    message: "Invalid credentials",
                    error: "Invalid credentials",
                    success: false
                });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const cookieOptions = {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
            sameSite: 'None',
            secure: true
        };

        res.cookie('token', jwtToken, cookieOptions);
        res.cookie('isLoggedIn', true, cookieOptions);

        return res.status(200).json({
            message: "SignIn Successful",
            success: true,
            userData: user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        });
    }
}

async function signUp(req, res) {
    try {
        const { name, email, password, confirmPassword} = req.body;
        console.log(req.file.filename);
        if (req.file) {
            pic = req.file.filename;
        }
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(409)
                .json({ message: "User Already Exists, You Can Login", success: false });
        }
        const newUser = new userModel({ name, email, password, confirmPassword, pic });
        console.log(newUser);
        
        await newUser.save()
        return res.status(201)
            .json({
                message: "SignUp Successful",
                success: true,
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: "Internal Server Error",
                success: false,
                error: err,
            })
    }
}

async function logOut(req, res) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });

        res.clearCookie('isLoggedIn', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });
        res.status(200).json({ message: 'Logged out successfully', success: true });
    } catch (err) {
        console.log(err);

        return res.status(500)
            .json({
                message: "Internal Server Error",
                success: false,
                error: err,
            })
    }
}

async function protected(req, res) {
    res.status(200).json({ message: 'User Authenticated', user: req.user, success: true });
}

module.exports = { signIn, signUp, logOut, protected }