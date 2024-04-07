export interface IInputProps {
  error?: string;
  value?: string | number;
  handleChange?: React.Dispatch<React.SetStateAction<string>>;
  type: INPUT_TYPES;
}

export enum INPUT_TYPES {
  EMAIL = "email",
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  PASSWORD = "password",
  CONFIRM = "confirm",
}

export const inputData: Record<
  INPUT_TYPES,
  { placeholder: string; topic: string }
> = {
  [INPUT_TYPES.FIRSTNAME]: {
    placeholder: "Enter your first name",
    topic: "FIRST NAME",
  },
  [INPUT_TYPES.LASTNAME]: {
    placeholder: "Enter your last name",
    topic: "LAST NAME",
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
};
