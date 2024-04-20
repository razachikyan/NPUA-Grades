import { ILecturer } from "@/types/user";

export const tableHeaders = [
  "Անուն Ազգանուն Հայրանուն",
  "Առարկա 1",
  "Առարկա 2",
  "Առարկա 3",
];

export const initialLecturer: ILecturer & { subject: string } = {
  lecturer_name: "",
  subject: "",
};
