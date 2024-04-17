import { Router } from "express";
import LecturerController from "../../controllers/lecturers";

const router = Router();

router.get("/", LecturerController.getLecturers);
router.post("/", LecturerController.createLecturer);
router.get("/:lecturer_id", LecturerController.getLecturerById);
router.get("/user/:user_id", LecturerController.getLecturerByUserId);

export default router;
