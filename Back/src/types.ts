export interface IUserResponse {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  password: string;
  user_id: string;
  session_id: string;
  one_time_code?: string;
}

export interface IUser {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IEvaluation {
  subject_id: string;
  student_id: string;
  id: number;
  lecturer_id: string;
  value: number;
  grade: number;
  semester: number;
}

export interface IGroup {
  group_name: string;
  id: number;
}

export interface ISubject {
  subject_name: string;
  lecturer: string;
  credit: number
}

export interface ISubjectResponse {
  subject_id: string;
  subject_name: string;
  id: number;
  lecturer_id: string;
  credit: number;
}

export interface ILecturerResponse {
  lecturer_name: string;
  lecturer_id: string;
  session_id: string;
  nickname: string;
  password: string;
  id: number;
}

export interface ILecturer {
  lecturer_name: string;
}

export interface IStudentResponse {
  student_id: string;
  session_id: string;
  id: number;
  number: number;
  firstname: string;
  lastname: string;
  middlename: string;
  group: string;
  nickname: string;
  password: string;
}

export interface IStudent {
  firstname: string;
  lastname: string;
  middlename: string;
  nickname: string;
  number: number;
  password: string;
  group: string;
}
