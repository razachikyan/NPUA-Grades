export interface IFormProps {
  type: "login" | "signup" | "forgot";
  submitText: string;
}

export interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm: string;
}