import { Router } from "express";
import LecturerController from "../../controllers/lecturers";

const router = Router();

router.get("/", LecturerController.getLecturers);
router.post("/", LecturerController.createLecturer);
router.post("/login", LecturerController.login);
router.get("/:session_id", LecturerController.getLecturer);
router.put("/:lecturer_id", LecturerController.editLecturer);
router.delete("/:lecturer_id", LecturerController.deleteLecturer);
router.get("/evaluations/:lecturer_id", LecturerController.getAllEvaluations);
router.get("/evaluations/:lecturer_id/:grade/:semester/:group", LecturerController.getEvaluations);

export default router;