import { nanoid } from "nanoid";
import DB from "../DB/index";
import { ISubjectResponse } from "../types";
import "dotenv/config";

export class SubjectService {
  public async getSubjectById(subject_id: string): Promise<ISubjectResponse> {
    const subject = await DB<ISubjectResponse>("subjects")
      .where({ subject_id })
      .first();
    if (!subject) throw Error("Subject id is not valid");

    return subject;
  }
  public async getSubjectsByLecturer(
    lecturer_id: string
  ): Promise<ISubjectResponse[]> {
    const subject = await DB<ISubjectResponse>("subjects").where({
      lecturer_id,
    });
    if (!subject) throw Error("Secturer id is not valid");

    return subject;
  }

  public async createSubject(subject_name: string): Promise<ISubjectResponse> {
    const subject_id = nanoid();
    await DB<ISubjectResponse>("subjects").insert({
      subject_id,
      subject_name,
    });

    const subject = await DB<ISubjectResponse>("subjects")
      .where({ subject_id })
      .first();
    if (!subject) throw Error("Couldn't create subject");
    return subject;
  }

  public async getSubjects(): Promise<ISubjectResponse[]> {
    const subjects = await DB<ISubjectResponse>("subjects");
    return subjects;
  }
}
