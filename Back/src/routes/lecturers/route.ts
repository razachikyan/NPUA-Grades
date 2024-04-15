import { Router } from "express";
import LecturerController from "../../controllers/lecturers";

const router = Router();

router.get("/", LecturerController.getLecturers);
router.get("/:lecturer_id", LecturerController.getLecturerById);
router.post("/", LecturerController.createLecturer);

export default router;
