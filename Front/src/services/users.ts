import { IFormData } from "@/components/features/form/types";
import axios from "axios";
import "dotenv/config";

export class UserServices {
  private backendBaseUrl;
  constructor() {
    this.backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async getUser(email: string, password: string) {
    try {
      const res = await axios.get(`${this.backendBaseUrl}/users`, {
        params: { email, password },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async createUser(userData?: IFormData) {
    try {
      const res = await axios.post(`${this.backendBaseUrl}/users`, userData);
      return res.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
