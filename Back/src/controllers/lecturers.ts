import { Request, Response } from "express";
import { LecturerService } from "../services/lecturers";

const lecturerService = new LecturerService();

export default {
  async createLecturer(req: Request, res: Response) {
    try {
      const { lecturer_name, subject_id } = req.body;
      const lecturer = await lecturerService.createLecturer(lecturer_name, subject_id);
      res.status(201).json(lecturer);
    } catch (error) {
      console.error("Error creating lecturer:", error);
      res.status(500).json(error);
    }
  },

  async getLecturers(_: Request, res: Response) {
    try {
      const lecturers = await lecturerService.getLecturers();
      return res.status(200).send(lecturers);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getLecturerById(req: Request, res: Response) {
    try {
      const { lecturer_id } = req.params;
      const lecturer = await lecturerService.getLecturerById(lecturer_id);
      return res.status(200).send(lecturer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getLecturerByUserId(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const lecturer = await lecturerService.getLecturerByUserId(user_id);
      return res.status(200).send(lecturer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
