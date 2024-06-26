import { INPUT_TYPES } from "../types";

export interface IInputProps {
  error?: string;
  value?: string | number;
  handleChange?: (value: string) => void;
  type: INPUT_TYPES;
}

export const inputData: Record<INPUT_TYPES, { placeholder: string; topic: string }> = {
  [INPUT_TYPES.FIRSTNAME]: {
    placeholder: "Enter your first name",
    topic: "FIRST NAME",
  },
  [INPUT_TYPES.LASTNAME]: {
    placeholder: "Enter your last name",
    topic: "LAST NAME",
  },
  [INPUT_TYPES.MIDDLENAME]: {
    placeholder: "Enter your middle name",
    topic: "MIDDLE NAME",
  },
  [INPUT_TYPES.EMAIL]: {
    placeholder: "Enter your email",
    topic: "EMAIL",
  },
  [INPUT_TYPES.PASSWORD]: {
    placeholder: "Enter your password",
    topic: "PASSWORD",
  },
  [INPUT_TYPES.CONFIRM]: {
    placeholder: "Confirm password",
    topic: "CONFIRM PASSWORD",
  },
  [INPUT_TYPES.CHANGE]: {
    placeholder: "Enter new password",
    topic: "NEW PASSWORD",
  },
};
