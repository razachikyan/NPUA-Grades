import { IStudent } from "@/types/user";

export const tableHeaders = [
  "Մատյանի համար",
  "Անուն Ազգանուն Հայրանուն",
  "Խումբ",
  "Կուրս",
  "Ինստիտուտ",
  "Վիճակագրություն",
];

export const initialStudent:IStudent = {
  firstname: "",
  lastname: "",
  middlename: "",
  group: "020"
}