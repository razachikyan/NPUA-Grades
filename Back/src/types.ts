export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: 0 | 1 | 2;
  user_id: string;
  session_id: string;
  one_time_code?: string;
  group_name?: string
  group_id?: string
}

export interface IEvaluation {
  subject_id: string;
  user_id: string;
  id: number;
  lecturer_id: string;
  value: number;
  grade: number
  semester: number
}

export interface IGroup {
  group_id: string;
  group_name: string;
  id: number;
}

export interface ISubject {
  subject_id: string;
  subject_name: string;
  id: number;
  group_id: string
  grade: number
  semester: number
}

export interface ILecturer {
  lecturer_id: string;
  lecturer_name: string;
  subject_id: string;
  id: number;
}