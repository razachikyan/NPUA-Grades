import { ISubjectResponse } from "@/types/subjects";
import axios from "axios";
import "dotenv/config";

export class SubjectSevice {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getSubjects(): Promise<ISubjectResponse[] | []> {
    try {
      const { data } = await axios.get(`${this.BaseUrl}/subjects`);
      return data;
    } catch (error) {
      return [];
    }
  }
}
