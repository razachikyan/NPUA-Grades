import { ILecturerResponse } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class LecturerService {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getUser(): Promise<ILecturerResponse | null> {
    try {
      const session = localStorage.getItem("session_id") ?? "";
      const res = await axios.get<ILecturerResponse>(
        `${this.BaseUrl}/lecturers/${session}`
      );

      if (!res.data) return null;
      return res.data;
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
}
