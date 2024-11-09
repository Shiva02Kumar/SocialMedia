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

        const { password: _, ...userData } = user.toObject();

        const jwtToken = jwt.sign(
            { userData },
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
            userData: userData
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
        const { name, email, password, confirmPassword } = req.body;
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
    res.status(200).json({ message: 'User Authenticated', userData: req.user, success: true });
}

async function searchUsers(req, res) {
    try {

        const query = req.query.search;

        if (!query) {
            return res.status(400).json({
                message: "Search query is required",
                success: false,
            });
        }
        console.log(query);
        const users = await userModel.find({
            _id: { $ne: req.user._id },
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('-password');
        console.log(users);

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Users found",
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error searching for users",
            success: false,
            error,
        });
    }
}

async function addDummyUsers(req, res) {
    const dummyUsers = [
        {
            name: 'Alice Johnson',
            email: `alice.johnson@example.com`,
            password: 'alicePass123',
            confirmPassword: 'alicePass123',
        },
        {
            name: 'Bob Smith',
            email: `bob.smith@example.com`,
            password: 'bobPass123',
            confirmPassword: 'bobPass123',
        },
        {
            name: 'Charlie Brown',
            email: `charlie.brown@example.com`,
            password: 'charliePass123',
            confirmPassword: 'charliePass123',
        },
        {
            name: 'Diana Prince',
            email: `diana.prince@example.com`,
            password: 'dianaPass123',
            confirmPassword: 'dianaPass123',
        },
        {
            name: 'Ethan Hunt',
            email: `ethan.hunt@example.com`,
            password: 'ethanPass123',
            confirmPassword: 'ethanPass123',
        },
        {
            name: 'Fiona Gallagher',
            email: `fiona.gallagher@example.com`,
            password: 'fionaPass123',
            confirmPassword: 'fionaPass123',
        },
        {
            name: 'George Clark',
            email: `george.clark@example.com`,
            password: 'georgePass123',
            confirmPassword: 'georgePass123',
        },
    ];

    for (const user of dummyUsers) {
        // Check if user already exists by email
        const existingUser = await userModel.findOne({ email: user.email });
        if (!existingUser) {
            try {
                const newUser = new userModel({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    confirmPassword: user.confirmPassword,
                });
                await newUser.save();
                console.log(`User ${user.name} added successfully.`);
            } catch (error) {
                console.error(`Error adding user ${user.name}:`, error);
            }
        } else {
            console.log(`User with email ${user.email} already exists.`);
        }
    }
    res.status(201).json({ message: "Done", success: true })
}

module.exports = { signIn, signUp, logOut, protected, searchUsers, addDummyUsers }