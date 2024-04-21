import { Request, Response } from "express";
import { StudentServices } from "../services/students";

const studentServices = new StudentServices();

export default {
  async login(req: Request, res: Response) {
    try {
      const user = await studentServices.login(req.body);
      res.status(200).send(user);
    } catch (error) {
      console.log("Error updating student:", error);
      res.status(500).json(error);
    }
  },

  async getStudents(req: Request, res: Response) {
    try {
      const { group, grade, semester } = req.params;
      const students = await studentServices.getStudents(
        group,
        grade,
        semester
      );
      res.status(201).send(students);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getStudent(req: Request, res: Response) {
    try {
      const { session_id } = req.params;
      const student = await studentServices.getStudent(session_id);
      res.status(201).send(student);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async addStudent(req: Request, res: Response) {
    try {
      const student = await studentServices.addStudent(req.body);
      res.status(201).send(student);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async updateStudent(req: Request, res: Response) {
    try {
      const { student_id } = req.params;
      const student = await studentServices.updateStudent(student_id, req.body);
      res.status(201).send(student);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async deleteStudent(req: Request, res: Response) {
    try {
      const { student_id } = req.params;
      await studentServices.deleteStudent(student_id);
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
