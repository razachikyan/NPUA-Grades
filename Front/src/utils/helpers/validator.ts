import {
  formErrors,
  IFormData,
  MESSAGES,
} from "@/components/features/form/types";
import { ILecturer, IStudent } from "@/types/user";

export class FormValidation {
  public validateUser(data: IStudent) {
    const firstNameRes = this.validateName(data.firstname);
    const middlenameRes = this.validateName(data.middlename);
    const lastNameRes = this.validateName(data.lastname);

    if (!lastNameRes && !firstNameRes && !middlenameRes)
      return { errors: null };
    const errors = {
      firstname: (firstNameRes && formErrors.firstname[firstNameRes]) ?? "",
      middlename: (middlenameRes && formErrors.middlename[middlenameRes]) ?? "",
      lastname: (lastNameRes && formErrors.firstname[lastNameRes]) ?? "",
    };

    return { errors };
  }

  public validateLecturer(data: ILecturer) {
    const [lastname, shortname] = data.lecturer_name.split(" ");
    const lastNameRes = this.validateName(lastname);
    const shortnameRes = this.validateName(
      shortname.slice(0, shortname.length - 1)
    );

    if (lastNameRes || shortnameRes) return { errors: null };
    const errors = {
      lastname: (lastNameRes && formErrors.lastname[lastNameRes]) ?? "",
      shortname: (shortnameRes && formErrors.firstname[shortnameRes]) ?? "",
    };

    return { errors };
  }

  public validateForLogIn(
    data: Pick<IFormData, "email" | "password"> & { isReset: boolean }
  ) {
    const passwordRes = this.validatePassword(data.password);
    const emailRes = this.validateEmail(data.email);
    if (data.isReset || (passwordRes && emailRes)) return { errors: null };

    return {
      email: emailRes ? formErrors.email[emailRes] ?? "" : "",
      password: passwordRes ? formErrors.password[passwordRes] ?? "" : "",
    };
  }

  public validateForChangePass({ password }: Pick<IFormData, "password">): {
    errors: Pick<IFormData, "password"> | null;
  } {
    const passwordRes = this.validatePassword(password);
    if (passwordRes) return { errors: null };
    const errors = {
      password: passwordRes ? formErrors.password[passwordRes] ?? "" : "",
    };

    return { errors };
  }

  public validateForSignUp(data: IFormData): { errors: IFormData | null } {
    const emailRes = this.validateEmail(data.email);
    const firstNameRes = this.validateName(data.firstname);
    const middlenameRes = this.validateName(data.middlename);
    const lastNameRes = this.validateName(data.lastname);
    const passwordRes = this.validatePassword(data.password);
    const confirmRes = this.validateConfirm(data.password, data.confirm);
    if (
      !confirmRes &&
      !lastNameRes &&
      !passwordRes &&
      !firstNameRes &&
      !emailRes
    )
      return { errors: null };
    const errors = {
      confirm: (confirmRes && formErrors.confirm[confirmRes]) ?? "",
      email: (emailRes && formErrors.email[emailRes]) ?? "",
      firstname: (firstNameRes && formErrors.firstname[firstNameRes]) ?? "",
      middlename: (middlenameRes && formErrors.middlename[middlenameRes]) ?? "",
      lastname: (lastNameRes && formErrors.firstname[lastNameRes]) ?? "",
      password: (passwordRes && formErrors.password[passwordRes]) ?? "",
    };

    return { errors };
  }

  public validateForForgot(email: string): {
    errors: Pick<IFormData, "email"> | null;
  } {
    const emailRes = this.validateEmail(email);
    if (emailRes) return { errors: null };
    const errors = {
      email: emailRes ? formErrors.email[emailRes] ?? "" : "",
    };

    return { errors };
  }

  private validateName(name: string): MESSAGES | null {
    if (name.length >= 3 && this.NAME_REGEXP.test(name)) return null;

    return name.length <= 3
      ? MESSAGES.SHORT
      : name.length === 0
      ? MESSAGES.EMPTY
      : MESSAGES.INVALID;
  }

  private validateEmail(email: string): MESSAGES | null {
    if (email.length && this.EMAIL_REGEXP.test(email)) {
      return null;
    }
    return email.length === 0 ? MESSAGES.EMPTY : MESSAGES.INVALID;
  }

  private validatePassword(password: string): MESSAGES | null {
    return password.length >= 10 ? null : MESSAGES.SHORT;
  }

  private validateConfirm(pass1: string, pass2: string): MESSAGES | null {
    return pass1 === pass2 && pass1 && pass2 ? null : MESSAGES.INCORRECT;
  }
  private NAME_REGEXP = /^[\u0531-\u0587\u0561-\u0587\u055A\u055B'-]+$/u;
  private EMAIL_REGEXP = /^[\w]+\.?[\w]+@[A-Za-z]+\.[A-Za-z]+$/;
}
