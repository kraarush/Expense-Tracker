import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {        
        const userToken = req.cookies.token;

        if (!userToken) {
            return res.status(401).json({
                message: "User not authenticated / Logged-In",
                success: false,
            });
        }

        const decode = jwt.verify(userToken, process.env.SECRET_KEY);
        const user = await User.findById(decode.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        req.id = user._id;
        next();

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in authMiddleware, " + error.message,
            success: false,
        });
    }
}

export default authMiddleware;