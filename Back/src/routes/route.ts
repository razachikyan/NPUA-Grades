import { Router } from "express";

import UsersRouter from "./users/route"
import GroupsRouter from "./groups/route"
import SubjectsRouter from "./subjects/route"
import LectorerRouter from "./lecturers/route";
import EvaluationsRouter from "./evaluations/route"

const router = Router();

router.use("/users", UsersRouter)
router.use("/groups", GroupsRouter)
router.use("/subjects", SubjectsRouter);
router.use("/lecturers", LectorerRouter);
router.use("/evaluations", EvaluationsRouter);

export default router