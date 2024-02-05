import { Request, Response } from "express";
import { Post, ServerResponse } from "../types";
import PostModel from "../models/post.model";
import { joiValidation } from "../services/joiValidation";

const getAll = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const posts: Post[] | null = await PostModel.getAll();
        if (!posts) {
            return res.status(400).json({ success: false, message: "Was impossible to get the posts" });
        }

        res.status(200).json({ success: true, message: "Correct", data: posts })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

const create = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const validation = await joiValidation("post", req.body);

        if (validation.error === "ValidationError") {
            return res.status(400).json({ success: false, message: validation.message });
        }

        const result = await PostModel.create({ authorUsername: req.user!.username, authorId: req.user!._id, authorAvatar: req.user?.urlAvatar, title: validation.title, content: validation.content });

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error.message })
        }

        res.status(200).json({ success: true, message: "Correct", data: result })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

const PostController = { getAll, create };
export default PostController;