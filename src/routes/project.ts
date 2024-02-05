import { Router } from "express";
import ProjectController from "../controllers/project";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/", ProjectController.getAll);
router.post("/", authenticate, ProjectController.create);

export default router;