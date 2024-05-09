import { Request, Response } from "express";
import { LecturerService } from "../services/lecturers";

const lecturerService = new LecturerService();

export default {
  async login(req: Request, res: Response) {
    try {
      const user = await lecturerService.login(req.body);
      res.status(200).send(user);
    } catch (error) {
      console.log("Error updating lecturer:", error);
      res.status(500).json(error);
    }
  },

  async editLecturer(req: Request, res: Response) {
    try {
      const { lecturer_id } = req.params;

      const newLecturer = await lecturerService.editLecturer(
        lecturer_id as string,
        req.body
      );
      res.status(201).json(newLecturer);
    } catch (error) {
      console.log("Error updating lecturer:", error);
      res.status(500).json(error);
    }
  },

  async createLecturer(req: Request, res: Response) {
    try {
      const lecturer = await lecturerService.createLecturer(req.body);
      res.status(201).json(lecturer);
    } catch (error) {
      console.log("Error creating lecturer:", error);
      res.status(500).json(error);
    }
  },

  async getLecturers(req: Request, res: Response) {
    try {
      const lecturers = await lecturerService.getLecturers();
      return res.status(200).send(lecturers);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getLecturer(req: Request, res: Response) {
    try {
      const { session_id } = req.params;
      const lecturer = await lecturerService.getLecturer(session_id);
      return res.status(200).send(lecturer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteLecturer(req: Request, res: Response) {
    try {
      const { lecturer_id } = req.params;
      const lecturer = await lecturerService.deleteLecturer(lecturer_id);
      return res.sendStatus(201);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getEvaluations(req: Request, res: Response) {
    try {
      const { lecturer_id, grade, semester, group } = req.params;
      const evaluations = await lecturerService.getEvaluations({
        lecturer_id,
        grade,
        semester,
        group,
      });
      return res.status(200).send(evaluations);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async getAllEvaluations(req: Request, res: Response) {
    try {
      const { lecturer_id } = req.params;
      const evaluations = await lecturerService.getAllEvaluations(lecturer_id);
      return res.status(200).send(evaluations);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
