import { Request, Response } from "express";
import { ServerResponse, User } from "../types";
import UserModel from "../models/user.model";
import { formatUser } from "../services/formatUser";

const getAll = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const users: User[] | null = await UserModel.getAll();
        if (!users) {
            return res.status(400).json({ success: false, message: "Was impossible to get users" });
        }

        const formatedUsers = users.map(user => formatUser(user));

        res.status(201).json({ success: true, message: "Correct", data: formatedUsers });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const getByName = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const { username } = req.params;
        const user: User | null = await UserModel.getByName({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: "Was impossible to get user" });
        }

        res.status(201).json({ success: true, message: "Correct", data: formatUser(user) });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}


const UserController = { getAll, getByName };
export default UserController;