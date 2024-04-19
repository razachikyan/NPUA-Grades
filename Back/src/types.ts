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
  user_id: string;
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
  subject_id: string;
  subject_name: string;
  id: number;
  group_id: string;
  grade: number;
  semester: number;
}

export interface ILecturer {
  lecturer_id: string;
  user_id: string;
  lecturer_name: string;
  subject_id: string;
  id: number;
}

export interface IStudentResponse {
  student_id: string;
  id: number;
  firstname: string;
  lastname: string;
  middlename: string;
  nickname: string;
  group: string;
  password: string;
}

export interface IStudent {
  firstname: string;
  lastname: string;
  middlename: string;
  nickname: string;
  password: string;
  group: string;
}
