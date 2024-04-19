import { ILecturer, IStudent, IStudentResponse, TGroups } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class AdminServices {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  public async addStudent(student: IStudent): Promise<IStudent | null> {
    try {
      const { data } = await axios.post(`${this.BaseUrl}/students`, student);
      if (!data) return null;
      return {
        firstname: data.firstname.trim(),
        lastname: data.lastname.trim(),
        middlename: data.middlename.trim(),
        group: data.group.trim(),
      };
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  public async getStudents({
    group,
    grade,
    semester,
  }: {
    group: TGroups;
    grade: number;
    semester: number;
  }): Promise<IStudentResponse[]> {
    try {
      const students: IStudentResponse[] = await axios.get(
        `${this.BaseUrl}/students/${group}/${grade}/${semester}`
      );
      if (!students) return [];
      return students;
    } catch (error: any) {
      console.error(error.message);
      return [];
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
