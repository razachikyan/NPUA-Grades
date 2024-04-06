export const validateName = (
  name: string
): { success: boolean; message?: MESSAGES } => {
  if (name.length > 3 && name.match(/^[A-Za-z]+$/)) {
    return { success: true };
  }
  const message: MESSAGES =
    name.length <= 3
      ? MESSAGES.SHORT
      : name.length === 0
      ? MESSAGES.EMPTY
      : MESSAGES.INVALID;
  return { success: false, message };
};

export const validateEmail = (
  email: string
): { success: boolean; message?: MESSAGES } => {
  if (email.length > 0 && email.match(/^[\w]+\.?[\w]+@[A-Za-z]+\.[A-Za-z]+$/)) {
    return { success: true };
  }
  const message = email.length === 0 ? MESSAGES.EMPTY : MESSAGES.INVALID;
  return { success: false, message };
};

export const validatePassword = (
  password: string
): { success: boolean; message?: MESSAGES } => {
  if (password.length > 6) {
    return { success: true };
  }
  return { success: false, message: MESSAGES.SHORT };
};

export const validateConfirm = (
  pass1: string,
  pass2: string
): { success: boolean; message?: MESSAGES } => {
  return pass1 === pass2
    ? { success: true }
    : { success: false, message: MESSAGES.INCORRECT };
};

export enum MESSAGES {
  SHORT = "short",
  EMPTY = "empty",
  INVALID = "invalid",
  INCORRECT = "incorrect",
}
