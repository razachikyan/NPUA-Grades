import { Router } from "express";

import UsersRouter from "./users/route"
import GroupsRouter from "./groups/route"
import SubjectsRouter from "./subjects/route"

const router = Router();

router.use("/users", UsersRouter)
router.use("/groups", GroupsRouter)
router.use("/subjects", SubjectsRouter);

export default router