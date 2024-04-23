import { IEvaluationResponse } from "@/types/evaluations";
import { IStudentResponse, TGroups } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class EvaluationService {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getEvaluationsByUserAndSemester(
    user_id: string,
    grade: number,
    semester: number
  ): Promise<IEvaluationResponse[]> {
    try {
      const { data } = await axios.get(
        `${this.BaseUrl}/evaluations/${user_id}/${grade}/${semester}`
      );
      return data;
    } catch (error) {
      return [];
    }
  }
  async getEvaluationsBySubjectAndSemester(
    subject_id: string,
    grade: number,
    semester: number
  ): Promise<IEvaluationResponse[] | null> {
    try {
      const { data } = await axios.get(
        `${this.BaseUrl}/evaluations/lecturer/${subject_id}/${grade}/${semester}`
      );
      return data;
    } catch (error) {
      return null;
    }
  }
  async getEvaluations(
    group: TGroups,
    grade: number,
    semester: number
  ): Promise<(IEvaluationResponse & IStudentResponse)[]> {
    try {
      const { data } = await axios.get(
        `${this.BaseUrl}/evaluations/stats/${group}/${grade}/${semester}`
      );
      if (!data) return [];
      return data;
    } catch (error) {
      return [];
    }
  }
}
