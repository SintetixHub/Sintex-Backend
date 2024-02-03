import { Router } from "express";
import PostController from "../controllers/post";

const router = Router();

router.get("/", PostController.getAll);
router.post("/", PostController.create);

export default router;