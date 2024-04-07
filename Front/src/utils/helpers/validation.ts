import { formErrors, IFormData } from "@/components/features/form/types";

export class FormValidation {
  public validate({
    email,
    firstname,
    lastname,
    password,
    confirm,
  }: IFormData): { errors: IFormData | null } {
    const emailRes = this.validateEmail(email);
    const firstNameRes = this.validateName(firstname);
    const lastNameRes = this.validateName(lastname);
    const passwordRes = this.validatePassword(password);
    const confirmRes = this.validateConfirm(password, confirm);

    if (
      confirmRes.success &&
      lastNameRes.success &&
      passwordRes.success &&
      firstNameRes.success &&
      emailRes.success
    ) {
      return {
        errors: null,
      };
    }
    const errors = {
      confirm: confirmRes.message
        ? formErrors.confirm[confirmRes.message] ?? ""
        : "",
      email: emailRes.message ? formErrors.email[emailRes.message] ?? "" : "",
      firstname: firstNameRes.message
        ? formErrors.firstname[firstNameRes.message] ?? ""
        : "",
      lastname: lastNameRes.message
        ? formErrors.firstname[lastNameRes.message] ?? ""
        : "",
      password: passwordRes.message
        ? formErrors.password[passwordRes.message] ?? ""
        : "",
    };

    return { errors };
  }
  private validateName(name: string): TValidateResult {
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
  }

  private validateEmail(email: string): TValidateResult {
    if (
      email.length > 0 &&
      email.match(/^[\w]+\.?[\w]+@[A-Za-z]+\.[A-Za-z]+$/)
    ) {
      return { success: true };
    }
    const message = email.length === 0 ? MESSAGES.EMPTY : MESSAGES.INVALID;
    return { success: false, message };
  }

  private validatePassword(password: string): TValidateResult {
    if (password.length >= 10) {
      return { success: true };
    }
    return { success: false, message: MESSAGES.SHORT };
  }

  private validateConfirm(pass1: string, pass2: string): TValidateResult {
    return pass1 === pass2 && pass1 && pass2
      ? { success: true }
      : { success: false, message: MESSAGES.INCORRECT };
  }
}

type TValidateResult = { success: boolean; message?: MESSAGES };

export enum MESSAGES {
  SHORT = "short",
  EMPTY = "empty",
  INVALID = "invalid",
  INCORRECT = "incorrect",
}
