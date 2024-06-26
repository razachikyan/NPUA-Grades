import { Request, Response } from "express";
import { EvaluationService } from "../services/evaluations";

const evaluationService = new EvaluationService();

export default {
  async addEvaluation(req: Request, res: Response) {
    try {
      const evaluation = await evaluationService.addEvaluation(req.body);
      res.status(201).json(evaluation);
    } catch (error) {
      console.log("Error creating evaluation:", error);
      res.status(500).json(error);
    }
  },
  async changeEvaluation(req: Request, res: Response) {
    try {
      const evaluation = await evaluationService.changeEvaluation(req.body);
      res.status(201).json(evaluation);
    } catch (error) {
      console.log("Error creating evaluation:", error);
      res.status(500).json(error);
    }
  },

  async getEvaluations(req: Request, res: Response) {
    try {
      const { group, grade, semester } = req.params;
      const evaluations = await evaluationService.getEvaluations({
        group,
        grade,
        semester,
      });
      return res.status(200).send(evaluations);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getEvaluationsByUser(req: Request, res: Response) {
    try {
      const { user_id, semester } = req.params;
      const evaluations = await evaluationService.getEvaluationsByUser(
        user_id,
        semester
      );
      return res.status(200).send(evaluations);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getEvaluationsByGroup(req: Request, res: Response) {
    try {
      const { group } = req.params;
      const evaluations = await evaluationService.getEvaluationsByGroup(group);
      return res.status(200).send(evaluations);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getEvaluationsBySemester(req: Request, res: Response) {
    try {
      const { grade, semester } = req.params;
      const evaluations = await evaluationService.getEvaluationsBySemester(
        grade,
        semester
      );
      return res.status(200).send(evaluations);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getEvaluationsBySemesterAndUser(req: Request, res: Response) {
    try {
      const { grade, semester, student_id } = req.params;
      const evaluations =
        await evaluationService.getEvaluationsBySemesterAndUser(
          grade,
          semester,
          student_id
        );

      return res.status(200).send(evaluations);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getEvaluationsByLecturerAndSemester(req: Request, res: Response) {
    try {
      const { grade, semester, lecturer_id } = req.params;
      const evaluations =
        await evaluationService.getEvaluationsByLecturerAndSemester(
          grade,
          semester,
          lecturer_id
        );

      return res.status(200).send(evaluations);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
