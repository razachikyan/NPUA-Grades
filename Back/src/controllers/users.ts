import { Request, Response } from "express";
import { UserServices } from "../services/users";

const userServices = new UserServices();

export default {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userServices.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: `Internal server error`, error });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userServices.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const { session } = req.query;
      const user = await userServices.getUserBySession(String(session));
      return res.status(200).send(user);
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
