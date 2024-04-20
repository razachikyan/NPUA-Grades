import { Router } from "express";

import UsersRouter from "./users/route";
import SubjectsRouter from "./subjects/route";
import LectorerRouter from "./lecturers/route";
import EvaluationsRouter from "./evaluations/route";
import StudensRouter from "./students/route";

const router = Router();

router.use("/users", UsersRouter);
router.use("/subjects", SubjectsRouter);
router.use("/students", StudensRouter);
router.use("/lecturers", LectorerRouter);
router.use("/evaluations", EvaluationsRouter);

export default router;
