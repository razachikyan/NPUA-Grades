import { ILecturerResponse } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class LecturerService {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getLecturerByUserId(
    user_id: string
  ): Promise<ILecturerResponse | null> {
    try {
      const { data } = await axios.get(
        `${this.BaseUrl}/lecturers/user/${user_id}`
      );
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
      return data;
    } catch (error) {
      return null;
    }
  }
}
