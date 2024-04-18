import { Router } from "express";
import StudentController from "../../controllers/students";

const router = Router();

router.get("/:group/:grade/:semester", StudentController.getStudents);
router.get("/:student_id", StudentController.getStudentById);
router.put("/:student_id", StudentController.updateStudent);
router.delete("/:student_id", StudentController.deleteStudent);
router.post("/", StudentController.addStudent);

export default router;
