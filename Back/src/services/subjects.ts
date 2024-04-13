import { nanoid } from "nanoid";
import DB from "../DB/index";
import { ISubject } from "../types";
import "dotenv/config";

export class SubjectService {
  public async getSubjectById(subject_id: string): Promise<ISubject> {
    const subject = await DB<ISubject>("subjects").where({ subject_id }).first();
    if (!subject) throw Error("Subject id is not valid");

    return subject;
  }

  public async createSubject(subject_name: string): Promise<ISubject> {
    const subject_id = nanoid();
    await DB<ISubject>("subjects").insert({
      subject_id,
      subject_name,
    });

    const subject = await DB<ISubject>("subjects").where({ subject_id }).first();
    if (!subject) throw Error("Couldn't create subject");
    return subject;
  }

  public async getSubjects(): Promise<ISubject[]> {
    const subjects = await DB<ISubject>("subjects");
    return subjects;
  }
}
