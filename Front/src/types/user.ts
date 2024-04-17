export interface IUserResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  middlename: string;
  password: string;
  role: 0 | 1 | 2;
  user_id: string;
  session_id: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  middlename: string;
  password: string;
}

export type TGroups = "020" | "920";
