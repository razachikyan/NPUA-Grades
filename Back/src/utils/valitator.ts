export class ValidationService {
  private validateUsername(username: string) {
    const reg = /^[\u0531-\u0587\u0561-\u0587\u055A\u055B'-]+$/u;
    return username.length >= 3 && reg.test(username);
  }

  private validateEmail(email: string) {
    return (
      email.length > 0 && email.match(/^[\w]+\.?[\w]+@[A-Za-z]+\.[A-Za-z]+$/)
    );
  }

  private validatePassword(password: string) {
    return password.length >= 10;
  }

  public validate({
    firstname,
    lastname,
    email,
    password,
  }: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    if (!this.validateUsername(firstname) || !this.validateUsername(lastname)) {
      throw new Error("Invalid username");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!this.validatePassword(password)) {
      throw new Error("Invalid password");
    }
  }
}
