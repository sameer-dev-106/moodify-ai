const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegister = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isAlreadyRegister) {
        let message = "User already exists";

        const emailMatch = isAlreadyRegister.email === email;
        const usernameMatch = isAlreadyRegister.username === username;

        if (emailMatch && usernameMatch) {
            message += "with this email and username";
        } else if (emailMatch) {
            message += "with this email address";
        } else if (usernameMatch) {
            message += "with this username";
        }

        return res.status(400).json({ message })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token);

    return res.status(201).json({
        message: "User Register Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

async function loginUser(req, res) {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password");

    if (!user) {
        res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token);

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.username
        }
    })

}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: "User fetched successfully",
        user
    });
}

async function logoutUser(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "No token found",
        });
    }

    res.clearCookie("token");

    await redis.set(token, Date.now().toString())

    res.status(200).json({
        message: "Logout successfully.",
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}
