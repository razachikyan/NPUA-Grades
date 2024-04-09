import { IFormData } from "@/components/features/form/types";
import axios from "axios";
import "dotenv/config";

export class UserServices {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async login(email: string, password: string) {
    try {
      const { data } = await axios.post(`${this.BaseUrl}/users/login`, {
        email,
        password,
      });

      localStorage.setItem("session_id", data.session_id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async getUser() {
    try {
      const session = localStorage.getItem("session_id");
      if (!session) return null;
      const { data } = await axios.get(
        `${this.BaseUrl}/users?session_id=${session}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async createUser(
    userData?: Pick<IFormData, "email" | "firstname" | "lastname" | "password">
  ) {
    try {
      const { data } = await axios.post(
        `${this.BaseUrl}/users/signup`,
        userData
      );
      localStorage.setItem("session_id", data.session_id);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
}
