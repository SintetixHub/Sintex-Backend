import { Router } from "express";

import AuthRouter from "./auth";
import UserRouter from "./user";
import ProjectRouter from "./project";
import PostRouter from "./post";

const router = Router()

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/project", ProjectRouter);
router.use("/post", PostRouter);

export default router;