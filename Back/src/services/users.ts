import knex from "knex";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { ValidationService } from "../utils/valitator";
import DB from "../DB/index";
import "dotenv/config";
import { IUser } from "../types";

export class UserServices {
  private validator: ValidationService;

  public constructor() {
    this.validator = new ValidationService();
  }

  public async login(email: string, password: string): Promise<IUser> {
    try {
      const user = await DB<IUser>("users").where({ email }).first();
      if (!user) throw Error("Wrong email address");

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw Error("Wrong password");

      const updatedUser = await DB<IUser>("users")
        .where({ email })
        .update({ session_id: nanoid() });

      if (updatedUser !== 1) throw new Error("Not valid session");

      const newUser = await DB<IUser>("users").where({ email }).first();
      if (!newUser) throw Error("Database error");
      return newUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async getUserBySession(session_id: string): Promise<IUser> {
    try {
      const user = await DB<IUser>("users").where({ session_id }).first();
      if (!user) throw Error("Invalid session");
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async createUser(userData: {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
  }): Promise<IUser> {
    try {
      this.validator.validate(userData);
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user_id = nanoid();
      const session_id = nanoid();
      await DB<IUser>("users").insert({
        ...userData,
        password: hashedPassword,
        user_id,
        session_id,
        role: 0,
      });

      const user = await DB<IUser>("users").where({ user_id }).first();
      if (!user) throw Error("DB error");
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
