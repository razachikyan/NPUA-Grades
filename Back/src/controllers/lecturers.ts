import { Request, Response } from "express";
import { LecturerService } from "../services/lecturers";

const lecturerService = new LecturerService();

export default {
  async editLecturer(req: Request, res: Response) {
    try {
      const { lecturer_id } = req.params;

      const newLecturer = await lecturerService.editLecturer(
        lecturer_id as string,
        req.body
      );
      res.status(201).json(newLecturer);
    } catch (error) {
      console.error("Error updating lecturer:", error);
      res.status(500).json(error);
    }
  },

  async createLecturer(req: Request, res: Response) {
    try {
      const lecturer = await lecturerService.createLecturer(req.body);
      res.status(201).json(lecturer);
    } catch (error) {
      console.error("Error creating lecturer:", error);
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

  async getLecturerById(req: Request, res: Response) {
    try {
      const { lecturer_id } = req.params;
      const lecturer = await lecturerService.getLecturerById(lecturer_id);
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
};
