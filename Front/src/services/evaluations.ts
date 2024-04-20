import { IEvaluationResponse } from "@/types/evaluations";
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
  ): Promise<IEvaluationResponse[] | null> {
    try {
      const { data } = await axios.get(
        `${this.BaseUrl}/evaluations/${user_id}/${grade}/${semester}`
      );
      return data;
    } catch (error) {
      return null;
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
}
