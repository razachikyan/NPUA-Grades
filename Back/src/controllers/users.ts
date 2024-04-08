import { Request, Response } from "express";
import { UserServices } from "../services/users";

const userServices = new UserServices();

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { firstname, lastname, email, password } = req.body;

      const userId = await userServices.createUser({
        firstname,
        lastname,
        email,
        password,
      });

      res.status(201).json({ userId });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async authenticateUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userServices.getUser(email, password);

      if (user) res.status(200).json({ message: "Login successful" });
      else res.status(401).json({ message: "Invalid email or password" });
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
