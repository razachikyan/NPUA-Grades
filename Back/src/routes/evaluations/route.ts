import { Router } from "express";
import EvaluationController from "../../controllers/evaluations";

const router = Router();

router.post("/", EvaluationController.addEvaluation);
router.put("/", EvaluationController.changeEvaluation);
router.get("/:user_id", EvaluationController.getEvaluationsByUser);
router.get("/group/:group", EvaluationController.getEvaluationsByGroup);
router.get("/:grade/:semester", EvaluationController.getEvaluationsBySemester); //
router.get(
  "/:student_id/:grade/:semester",
  EvaluationController.getEvaluationsBySemesterAndUser
);
router.get(
  "/stats/:group/:grade/:semester",
  EvaluationController.getEvaluations
); //
router.get(
  "/lect/:lecturer_id/:grade/:semester",
  EvaluationController.getEvaluationsByLecturerAndSemester
);

export default router;
