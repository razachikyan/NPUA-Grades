import { Request, Response } from "express";
import { GroupService } from "../services/groups";

const groupService = new GroupService();

export default {
  async createGroup(req: Request, res: Response) {
    try {
      const { group_name } = req.body;
      const group = await groupService.createGroup(group_name);
      res.status(201).json(group);
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(500).json(error);
    }
  },

  async getGroups(_: Request, res: Response) {
    try {
      const groups = await groupService.getGroups();
      return res.status(200).send(groups);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getGroupById(req: Request, res: Response) {
    try {
      const { group_id } = req.params;
      const group = await groupService.getGroupById(group_id)
      return res.status(200).send(group);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
