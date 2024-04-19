import { Request, Response } from "express";
import { StudentServices } from "../services/students";

const studentServices = new StudentServices();

export default {
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
      console.error(error);
      res.status(500).json(error);
    }
  },

  async getStudentById(req: Request, res: Response) {
    try {
      const { student_id } = req.params;
      const student = await studentServices.getStudentById(student_id);
      res.status(201).send(student);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async addStudent(req: Request, res: Response) {
    try {
      console.log("------------------", req.body);

      const student = await studentServices.addStudent(req.body);
      res.status(201).send(student);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async updateStudent(req: Request, res: Response) {
    try {
      const student = await studentServices.updateStudent(req.body);
      res.status(201).send(student);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteStudent(req: Request, res: Response) {
    try {
      const { student_id } = req.params;
      const student = await studentServices.deleteStudent(student_id);
      res.status(201).send(student);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};
