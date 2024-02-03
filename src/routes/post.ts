import { Router } from "express";
import PostController from "../controllers/post";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/", PostController.getAll);
router.post("/", authenticate, PostController.create);

export default router;