import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../services/jwt.js";
import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "../types.js";

interface RequestWithUser extends Request {
    user: string | JwtPayload
}

const authenticate = async (req: RequestWithUser, res: Response<ServerResponse>, next: NextFunction) => {
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

        req.user = user;

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