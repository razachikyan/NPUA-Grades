import { Request, Response } from "express";
import { UserServices } from "../services/users";

const userServices = new UserServices();

export default {
  async signup(req: Request, res: Response) {
    try {
      const user = await userServices.signup(req.body);
      res.status(201).json("hwllo");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json(error);
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userServices.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json(error);
    }
  },

  async changePass(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userServices.changePass(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json(error);
    }
  },

  async loginWithOnetimeCode(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userServices.loginWithOnetimeCode(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json(error);
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const { session_id } = req.params;
      const user = await userServices.getUserBySession(session_id);
      return res.status(200).send(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = await userServices.getUserById(user_id);
      return res.status(200).send(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userServices.getUsers();
      return res.status(200).send(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async sendCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await userServices.sendCode(email);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
