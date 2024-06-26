import { IEvaluationResponse } from "@/types/evaluations";
import { ILecturerResponse, IStudentResponse, TGroups } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class LecturerService {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getUser(): Promise<ILecturerResponse | null> {
    try {
      const session = localStorage.getItem("session_id") ?? "wrong session";
      const { data } = await axios.get<ILecturerResponse>(
        `${this.BaseUrl}/lecturers/${session}`
      );

      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  }

  async login(
    creds: Pick<ILecturerResponse, "password" | "nickname">
  ): Promise<null | ILecturerResponse> {
    try {
      if (!creds.nickname || !creds.password) return null;
      const { data }: { data: ILecturerResponse } = await axios.post(
        `${this.BaseUrl}/lecturers/login`,
        creds
      );
      if (!data) return null;
      localStorage.setItem("session_id", data.session_id);
      return data;
    } catch (error) {
      return null;
    }
  }

  async evaluate(
    evaluation: Pick<
      IEvaluationResponse,
      | "grade"
      | "lecturer_id"
      | "semester"
      | "subject_id"
      | "value"
      | "student_id"
    >
  ): Promise<IEvaluationResponse | null> {
    try {
      const { data }: { data: IEvaluationResponse } = await axios.put(
        `${this.BaseUrl}/evaluations`,
        evaluation
      );
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  }

  async addEvaluation(
    evaluation: Pick<
      IEvaluationResponse,
      | "grade"
      | "lecturer_id"
      | "semester"
      | "subject_id"
      | "value"
      | "student_id"
    >
  ): Promise<IEvaluationResponse | null> {
    try {
      const { data }: { data: IEvaluationResponse } = await axios.post(
        `${this.BaseUrl}/evaluations`,
        evaluation
      );
      if (!data) return null;
      return data;
    } catch (error) {
      return null;
    }
  }

  async getEvaluations(
    lecturer_id: string,
    grade: number,
    semester: number,
    group: TGroups
  ): Promise<(IEvaluationResponse & IStudentResponse)[]> {
    try {
      const { data }: { data: (IEvaluationResponse & IStudentResponse)[] } =
        await axios.get(
          `${this.BaseUrl}/lecturers/evaluations/${lecturer_id}/${grade}/${semester}/${group}`
        );
      if (!data) return [];
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getAllEvaluations(
    lecturer_id: string
  ): Promise<(IEvaluationResponse & IStudentResponse)[]> {
    try {
      const { data }: { data: (IEvaluationResponse & IStudentResponse)[] } =
        await axios.get(`${this.BaseUrl}/lecturers/evaluations/${lecturer_id}`);
      if (!data) return [];
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
