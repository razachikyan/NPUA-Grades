import { IStudentResponse } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class StudentServives {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getUser(): Promise<IStudentResponse | null> {
    try {
      const session = localStorage.getItem("session_id") ?? "wrong session";
      const res = await axios.get<IStudentResponse>(
        `${this.BaseUrl}/students/${session}`
      );

      if (!res.data) return null;
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async login(
    creds: Pick<IStudentResponse, "password" | "nickname">
  ): Promise<null | IStudentResponse> {
    try {
      if (!creds.nickname || !creds.password) return null;
      const { data }: { data: IStudentResponse } = await axios.post(
        `${this.BaseUrl}/students/login`,
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
