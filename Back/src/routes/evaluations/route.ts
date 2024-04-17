import { Router } from "express";
import EvaluationController from "../../controllers/evaluations";

const router = Router();

router.post("/", EvaluationController.addEvaluation);
router.get("/", EvaluationController.getAllEvaluations);
router.get("/:user_id", EvaluationController.getEvaluationsByUser);
router.get("/:grade/:semester", EvaluationController.getEvaluationsBySemester); //
router.get("/:user_id/:grade/:semester", EvaluationController.getEvaluationsBySemesterAndUser);
router.get("/lecturer/:user_id/:grade/:semester", EvaluationController.getEvaluationsBySemesterAndSubject);

export default router;
