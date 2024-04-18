import { ILecturer, IStudent, TGroups } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class AdminServices {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  public async addStudent(student: IStudent) {
    try {
      const user = await axios.post(`${this.BaseUrl}/students`, student);
      if (!user) return null;
      return user;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  public async addLecturer(lecturer: ILecturer) {
    try {
      const user = await axios.post(`${this.BaseUrl}/lecturers`, lecturer);
      if (!user) return null;
      return user;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  public async editLecturers({
    grade,
    group,
    semester,
  }: {
    group: TGroups;
    semester: number;
    grade: number;
  }) {
    try {
      const lecturers = await axios.get(
        `${this.BaseUrl}/${group}/${grade}/${semester}`
      );

      if (!lecturers) return [];
      return lecturers;
    } catch (error: any) {
      console.error(error.message);
      return [];
    }
  }
  public async editStudent(student_id: string, data: Partial<IStudent>) {
    try {
      const student = axios.put(`${this.BaseUrl}/students/${student_id}`, data);
      if (!student) return null;
      return student;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async deleteLecturer(lecturer_id: string) {
    try {
      const lecturer = await axios.delete(
        `${this.BaseUrl}/lecturers/${lecturer_id}`
      );
      if (!lecturer) return null;
      return lecturer;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  public async deleteStudent(student_id: string) {
    try {
      const student = await axios.delete(
        `${this.BaseUrl}/students/${student_id}`
      );
      if (!student) return null;
      return student;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
