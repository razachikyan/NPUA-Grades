import { IFormData } from "@/components/features/form/types";
import { IUser, IUserResponse } from "@/types/user";
import axios from "axios";
import "dotenv/config";

export class UserServices {
  private BaseUrl;
  constructor() {
    this.BaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }

  async login(
    email: string,
    password: string,
    isReset?: boolean
  ): Promise<IUser | null> {
    try {
      const { data } = await axios.post(
        `${this.BaseUrl}/users/login${isReset ? "/reset" : ""}`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("session_id", data.session_id);
      return data;
    } catch (error) {
      return null;
    }
  }

  async changePass(password: string): Promise<IUser | null> {
    try {
      const user = await this.getUser();
      const { data } = await axios.post(`${this.BaseUrl}/users/change-pass`, {
        password,
        email: user?.email,
      });

      return data;
    } catch (error) {
      return null;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await axios.post(`${this.BaseUrl}/users/reset`, { email });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async getUser(): Promise<IUserResponse | null> {
    try {
      const session = localStorage.getItem("session_id") ?? "";
      const res = await axios.get<IUserResponse>(`${this.BaseUrl}/users/${session}`);

      if (!res.data) return null;
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getUserById(user_id: string): Promise<IUser | null> {
    try {
      const res = await axios.get<IUser>(`${this.BaseUrl}/users/id/${user_id}`);

      if (!res.data) return null;
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async createUser(
    userData: Pick<IFormData, "email" | "firstname" | "lastname" | "password">
  ): Promise<IUser | null> {
    try {
      const { data } = await axios.post(
        `${this.BaseUrl}/users/signup`,
        userData
      );
      localStorage.setItem("session_id", data.session_id);
      return data;
    } catch (error) {
      return null;
    }
  }
}
