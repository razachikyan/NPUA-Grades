import { Request, Response } from "express";
import { SubjectService } from "../services/subjects";

const subjectService = new SubjectService();

export default {
  async createSubject(req: Request, res: Response) {
    try {
      const { subject_name } = req.body;
      const subject = await subjectService.createSubject(subject_name);
      res.status(201).json(subject);
    } catch (error) {
      console.log("Error creating subject:", error);
      res.status(500).json(error);
    }
  },

  async getSubjects(_: Request, res: Response) {
    try {
      const subjects = await subjectService.getSubjects();
      return res.status(200).send(subjects);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSubjectById(req: Request, res: Response) {
    try {
      const { subject_id } = req.params;
      const subject = await subjectService.getSubjectById(subject_id);
      return res.status(200).send(subject);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
