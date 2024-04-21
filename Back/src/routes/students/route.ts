import { Router } from "express";
import StudentController from "../../controllers/students";

const router = Router();

router.post("/", StudentController.addStudent);
router.post("/login", StudentController.login);
router.get("/:student_id", StudentController.getStudentById);
router.put("/:student_id", StudentController.updateStudent);
router.delete("/:student_id", StudentController.deleteStudent);
router.get("/:group/:grade/:semester", StudentController.getStudents);

export default router;
