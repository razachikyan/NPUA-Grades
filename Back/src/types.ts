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
  id: string;
  lecturer_id: string;
  value: number;
}

export interface IGroup {
  group_id: string;
  group_name: string;
  id: string;
}

export interface ISubject {
  subject_id: string;
  subject_name: string;
  id: string;
}