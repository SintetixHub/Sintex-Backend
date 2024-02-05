import { Request, Response } from "express";
import { Project, ServerResponse } from "../types";
import ProjectModel from "../models/project.model";
import { joiValidation } from "../services/joiValidation";

const getAll = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const projects: Project[] | null = await ProjectModel.getAll();
        if (!projects) {
            return res.status(400).json({ success: false, message: "Was impossible to get the projects" });
        }

        res.status(200).json({ success: true, message: "Correct", data: projects })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

const create = async (req: Request, res: Response<ServerResponse>) => {
    try {
        const validation = await joiValidation("project", req.body);


        if (validation.error === "ValidationError") {
            return res.status(400).json({ success: false, message: validation.message });
        }
        const result = await ProjectModel.create({
            title: validation.title,
            authorName: req.user!.username,
            description: validation.description,
            hasDoc: validation.hasDoc,
            hasTasksManager: validation.hasTasksManager,
            repository: validation.repository,
            membersCount: validation.membersCount
        });

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error.message })
        }

        res.status(200).json({ success: true, message: "Correct" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

const ProjectController = { getAll, create };
export default ProjectController;