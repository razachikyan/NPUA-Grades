import bcrypt from "bcrypt";
import database from "../DB/database";

export class UserServices {
  public async getUser(email: string, password: string) {
    try {
      const user = await database.getKnex()("users").where({ email }).first();

      if (!user) return null;

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) return user;
      else return null;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  public async createUser(userData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const userIds = await database
        .getKnex()("users")
        .insert({
          ...userData,
          password: hashedPassword,
        });
      const userId = userIds[0];

      return userId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
