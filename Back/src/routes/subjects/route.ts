import { Router } from "express";
import SubjectController from "../../controllers/subjects";

const router = Router();

router.get("/", SubjectController.getSubjects);
router.get("/lect/:lecturer_id", SubjectController.getSubjectsByLecturer);
router.get("/:subject_id", SubjectController.getSubjectById);
router.post("/", SubjectController.createSubject);

export default router;
