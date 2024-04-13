import { Router } from "express";
import SubjectController from "../../controllers/subjects";

const router = Router();

router.get("/", SubjectController.getSubjects);
router.get("/:group_id", SubjectController.getSubjectById);
router.post("/", SubjectController.createSubject);

export default router;
