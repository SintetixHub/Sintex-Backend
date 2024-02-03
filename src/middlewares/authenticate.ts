import { verifyToken } from "../services/jwt";
import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "../types.js";

interface User { username: string, email: string, _id: string, urlAvatar: string }

const authenticate = async (req: Request, res: Response<ServerResponse>, next: NextFunction) => {
    try {
        const { jwt: token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = verifyToken(token);
        if (!user) {
            return res
                .clearCookie("token")
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        req.user = user as User;

        next();
    } catch (err) {
        console.log(err);
        res
            .clearCookie("token")
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
};

export { authenticate };