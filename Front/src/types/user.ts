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

export interface ILecturerResponse {
  lecturer_id: string;
  lecturer_name: string;
  password: string;
  middlename: string;
  subject_id: string;
  id: number;
}

export interface ILecturer {
  lecturer_name: string;
  subject: string;
}

export interface IStudentResponse {
  student_id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  group: string;
  id: number;
}
export interface IStudent {
  firstname: string;
  lastname: string;
  middlename: string;
  group: string;
}
