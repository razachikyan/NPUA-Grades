import { nanoid } from "nanoid";
import DB from "../DB/index";
import { IGroup } from "../types";
import "dotenv/config";

export class GroupService {
  public async getGroupById(group_id: string): Promise<IGroup> {
    const group = await DB<IGroup>("groups").where({ group_id }).first();
    if (!group) throw Error("Group id is not valid");

    return group;
  }

  public async createGroup(group_name: string): Promise<IGroup> {
    const group_id = nanoid();
    await DB<IGroup>("groups").insert({
      group_id,
      group_name,
    });

    const group = await DB<IGroup>("groups").where({ group_id }).first();
    if (!group) throw Error("Couldn't create group");
    return group;
  }

  public async getGroups(): Promise<IGroup[]> {
    const groups = await DB<IGroup>("groups");
    return groups;
  }
}
