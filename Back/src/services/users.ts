import bcrypt from "bcrypt";
import { nanoid, customAlphabet } from "nanoid";
import { ValidationService } from "../utils/valitator";
import DB from "../DB/index";
import { IUser } from "../types";
import EmailService from "../utils/mailer";
import "dotenv/config";

export class UserServices {
  private validator: ValidationService;

  public constructor() {
    this.validator = new ValidationService();
  }

  public async login(email: string, password: string): Promise<IUser> {
    const user = await DB<IUser>("users").where({ email }).first();
    if (!user) throw Error("User with this email address doesn't exist");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw Error("Wrong password");

    const updatedCount = await DB<IUser>("users")
      .where({ email })
      .update({ session_id: nanoid() });
    if (updatedCount !== 1) throw new Error("Can't update user");

    const newUser = await DB<IUser>("users").where({ email }).first();
    if (!newUser) throw Error("Database error");
    return newUser;
  }

  public async getUserBySession(session_id: string): Promise<IUser> {
    const user = await DB<IUser>("users").where({ session_id }).first();
    if (!user) throw Error("Session id is not valid");
    return user;
  }

  public async createUser(
    userData: Pick<IUser, "email" | "password" | "lastname" | "firstname">
  ): Promise<IUser> {
    this.validator.validate(userData);
    const checkUser = await DB<IUser>("users")
      .where({ email: userData.email })
      .first();
    if (checkUser) throw Error("User with this email address already exist");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user_id = nanoid();
    const session_id = nanoid();
    await DB<IUser>("users").insert({
      ...userData,
      password: hashedPassword,
      user_id,
      session_id,
    });

    const user = await DB<IUser>("users").where({ user_id }).first();
    if (!user) throw Error("Couldn't create user");
    return user;
  }

  public async sendCode(email: string): Promise<void> {
    const user = await DB<IUser>("users").where({ email }).first();
    if (!user) throw Error("User with this email address doesn't exist");
    const mailer = new EmailService();
    const code = customAlphabet("0123456789", 6)();
    await DB<IUser>("users").where({ email }).update({ one_time_code: code });
    mailer.sendResetPasswordEmail(user.email, code);
  }
}
