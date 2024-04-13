export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: 0 | 1 | 2;
  user_id: string;
  session_id: string;
}

export const userRoles = {
  student: 0,
  lecturer: 1,
  admin: 2,
}