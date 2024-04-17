import { ILecturerResponse } from "@/types/lecturers";
import axios from "axios";
import "dotenv/config";

export class LecturerService {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getLecturerByUserId(user_id: string): Promise<ILecturerResponse | null> {
    try {
      const { data } = await axios.get(`${this.BaseUrl}/lecturers/user/${user_id}`);
      return data;
    } catch (error) {
      return null;
    }
  }
}
