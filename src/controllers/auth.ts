import { Request, Response } from "express";
import { ServerResponse, User } from "../types";
import { joiValidation } from "../services/joiValidation";
import UserModel from "../models/user.model";
import { formatUser } from "../services/formatUser";
import { createToken } from "../services/jwt";

const login = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const validation = await joiValidation("login", req.body);

        if (validation.error === "ValidationError") {
            return res.status(400).json({ success: false, message: validation.message });
        };

        const result = await UserModel.getByName({ username: validation.username });

        if (!result) {
            return res.status(400).json({ success: false, message: "Incorrect data" });
        }

        const samePass = await result.isValidPassword(validation.password);
        if (!samePass) {
            return res.status(400).json({ success: false, message: "Incorrect data" });
        }

        const token = createToken(result);

        res.cookie("jwt", token, {
            httpOnly: true,
            // secure: true,
            // maxAge: 3000000,
            // signed: true,
        }
        );

        res.status(201).json({ success: true, message: "Logged in successfully", data: formatUser(result) });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const signup = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const validation = await joiValidation("signup", req.body);

        if (validation.error === "ValidationError") {
            return res.status(400).json({ success: false, message: validation.message });
        };

        const result = await UserModel.create(validation);

        if (result.error) {
            if (Object.keys(result.error.keyPattern).includes("email"))
                return res.status(400).json({ success: false, message: "Email already used" })
            if (Object.keys(result.error.keyPattern).includes("username"))
                return res.status(400).json({ success: false, message: "Username already used" })
            return res.status(400).json({ success: false, message: result.error.message });
        }

        res.status(201).json({ success: true, message: "User Created" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const logout = async (req: Request, res: Response<ServerResponse>) => {
    try {

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const AuthController = { login, signup, logout };
export default AuthController;