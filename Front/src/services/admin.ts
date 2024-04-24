import { IFormData } from "@/components/features/form/types";
import {
  ILecturer,
  ILecturerResponse,
  IStudent,
  IStudentResponse,
  IUser,
  IUserResponse,
  TGroups,
} from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class AdminServices {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  public async addStudent(student: IStudent): Promise<IStudent | null> {
    try {
      const { data }: { data: IStudentResponse } = await axios.post(
        `${this.BaseUrl}/students`,
        student
      );
      if (!data) return null;
      return {
        firstname: data.firstname.trim(),
        lastname: data.lastname.trim(),
        middlename: data.middlename.trim(),
        group: data.group.trim(),
        number: data.number,
      };
    } catch (error: any) {
      console.log(error.message);
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
      const { data }: { data: IStudentResponse[] } = await axios.get(
        `${this.BaseUrl}/students/${group}/${grade}/${semester}`
      );
      if (!data) return [];
      return data;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }

  public async editStudent(student_id: string, data: IStudent) {
    try {
      const student = axios.put(`${this.BaseUrl}/students/${student_id}`, data);
      if (!student) return null;
      return student;
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

  public async getLecturers(): Promise<ILecturerResponse[]> {
    try {
      const { data }: { data: ILecturerResponse[] } = await axios.get(
        `${this.BaseUrl}/lecturers`
      );
      if (!data) return [];
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async addLecturer(lecturer: ILecturer & { subject: string }) {
    try {
      const user = await axios.post(`${this.BaseUrl}/lecturers`, {
        lecturer_name: lecturer.lecturer_name.trim(),
        subject: lecturer.subject.trim(),
      });
      if (!user) return null;
      return user;
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }

  public async editLecturer(
    lecturer_id: string,
    updated: ILecturer & { subject: string }
  ): Promise<ILecturerResponse | null> {
    try {
      const lecturer: ILecturerResponse = await axios.put(
        `${this.BaseUrl}/lecturers/${lecturer_id}`,
        {
          lecturer_name: updated.lecturer_name.trim(),
          subject: updated.subject.trim(),
        }
      );

      if (!lecturer) return null;
      return lecturer;
    } catch (error: any) {
      console.log(error.message);
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

  async login(
    email: string,
    password: string,
    isReset?: boolean
  ): Promise<IUser | null> {
    try {
      const { data } = await axios.post(
        `${this.BaseUrl}/users/login${isReset ? "/reset" : ""}`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("session_id", data.session_id);
      return data;
    } catch (error) {
      return null;
    }
  }

  async changePass(password: string): Promise<IUser | null> {
    try {
      const user = await this.getUser();
      const { data } = await axios.post(`${this.BaseUrl}/users/change-pass`, {
        password,
        email: user?.email,
      });

      return data;
    } catch (error) {
      return null;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await axios.post(`${this.BaseUrl}/users/reset`, { email });
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  }

  async getUser(): Promise<IUserResponse | null> {
    try {
      const session = localStorage.getItem("session_id") ?? "wrong session";
      const res = await axios.get<IUserResponse>(
        `${this.BaseUrl}/users/${session}`
      );

      if (!res.data) return null;
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getUserById(user_id: string): Promise<IUser | null> {
    try {
      const res = await axios.get<IUser>(`${this.BaseUrl}/users/id/${user_id}`);

      if (!res.data) return null;
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async createUser(
    userData: Pick<IFormData, "email" | "firstname" | "lastname" | "password">
  ): Promise<IUser | null> {
    try {
      const { data } = await axios.post(
        `${this.BaseUrl}/users/signup`,
        userData
      );
      localStorage.setItem("session_id", data.session_id);
      return data;
    } catch (error) {
      return null;
    }
  }
}
