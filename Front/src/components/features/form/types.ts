export interface IFormProps {
  type: "login" | "signup" | "forgot" | "change";
  submitText: string;
  onSubmit?: () => void;
  disabledSubmit?: boolean;
}

export interface IFormData {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  password: string;
  confirm: string;
}

export enum INPUT_TYPES {
  EMAIL = "email",
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  MIDDLENAME = "middlename",
  PASSWORD = "password",
  CONFIRM = "confirm",
  CHANGE = "change",
}

export enum MESSAGES {
  SHORT = "short",
  EMPTY = "empty",
  INVALID = "invalid",
  INCORRECT = "incorrect",
}

export const formErrors: Record<
  INPUT_TYPES,
  Partial<Record<MESSAGES, string>>
> = {
  [INPUT_TYPES.FIRSTNAME]: {
    [MESSAGES.EMPTY]: "•‎Enter First name",
    [MESSAGES.SHORT]: "•‎First name shoud be longer",
  },
  [INPUT_TYPES.MIDDLENAME]: {
    [MESSAGES.EMPTY]: "•‎Enter First name",
    [MESSAGES.SHORT]: "•‎First name shoud be longer",
  },
  [INPUT_TYPES.LASTNAME]: {
    [MESSAGES.EMPTY]: "•‎Enter Last name",
    [MESSAGES.SHORT]: "•‎Last name shoud be longer",
  },
  [INPUT_TYPES.EMAIL]: {
    [MESSAGES.EMPTY]: "•‎Enter Email",
    [MESSAGES.INVALID]: "•‎Enter a valid Email",
  },
  [INPUT_TYPES.PASSWORD]: {
    [MESSAGES.EMPTY]: "•‎Enter Password",
    [MESSAGES.SHORT]: "•‎ Password should be at least 10 characters long",
  },
  [INPUT_TYPES.CONFIRM]: {
    [MESSAGES.EMPTY]: "•‎Enter the password again",
    [MESSAGES.INCORRECT]: "•‎Incorrect password",
  },
  [INPUT_TYPES.CHANGE]: {
    [MESSAGES.EMPTY]: "•‎Enter the password again",
    [MESSAGES.SHORT]: "•‎ Password should be at least 10 characters long",
  },
};

export const initialData = {
  firstname: "",
  lastname: "",
  middlename: "",
  email: "",
  password: "",
  confirm: "",
};

export const roleOptions = ["admin", "lecturer", "student"];
export const groupOptions = ["020", "920"];
