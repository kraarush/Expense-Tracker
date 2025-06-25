import bcrypt from "bcrypt";
import validator from 'validator';
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import refineUser from "../utils/refineUser.js";

export const register = async (req, res) => {
    try {
        
        let { fullname, email, password } = req.body;

        fullname = fullname?.trim() || "";
        email = validator.normalizeEmail(email?.trim() || "");
        password = password?.trim() || "";

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "some fields are missing",
                success: false,
            });
        }

        const user = await User.findOne({ email });

        // checking if user with same email exists
        if (user) {
            return res.status(400).json({
                message: "User with email already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            user: refineUser(newUser),
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in Creating account, " + error.message,
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = validator.normalizeEmail(email?.trim() || "");
        password = password?.trim() || "";

        if (!email || !password) {
            return res.status(400).json({
                message: 'Some fields are missing',
                success: false,
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: 'Invalid email format',
                success: false,
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'Email does not exist',
                success: false,
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({
                message: 'Incorrect password',
                success: false,
            });
        }

        const isProduction = process.env.NODE_ENV === "production";

        const tokenData = {
            userId: user._id,
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: '1d',
        });


        return res
            .status(200)
            .cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'strict',
            })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user: refineUser(user),
                success: true,
            });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false,
        });
    }
};


export const logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie('token', "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true,
            });
    } catch (error) {
        console.error("Logout Error: ", error.message);
        res.status(500).json({
            message: `Internal server error in logging out: ${error.message}`,
            success: false,
        });
    }
};