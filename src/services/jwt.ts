import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../types";

const createToken = (user: User) => {
    try {
        const userToToken = {
            username: user.username,
            _id: user._id,
            email: user.email,
            urlAvatar: user.urlAvatar
        }
        return jwt.sign(userToToken, config.SECRET_KEY, {
            expiresIn: config.EXPIRATION_TIME,
        });
    } catch (err) {
        throw Error("Must set a SECRET_KET as env");
    }
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, config.SECRET_KEY);
    } catch (err) {
        return null;
    }
};

export { createToken, verifyToken };