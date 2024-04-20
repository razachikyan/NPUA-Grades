import { nanoid } from "nanoid";
import DB from "../DB/index";
import {
  ILecturer,
  ILecturerResponse,
  ISubject,
  ISubjectResponse,
} from "../types";
import "dotenv/config";

export class LecturerService {
  public async getLecturerById(
    lecturer_id: string
  ): Promise<ILecturerResponse> {
    const lecturer = await DB<ILecturerResponse>("lecturers")
      .where({ lecturer_id })
      .first();
    if (!lecturer) throw Error("Lecturer id is not valid");

    return lecturer;
  }

  public async createLecturer(data: ILecturer): Promise<ILecturerResponse> {
    const lecturer_id = nanoid();
    const subject = await DB<ISubjectResponse>("subjects")
      .where({
        subject_name: data.subject,
      })
      .first();
    if (!subject) throw Error("Invalid subject name");

    await DB<ILecturerResponse>("lecturers").insert({
      lecturer_id,
      lecturer_name: data.lecturer_name,
      subject_id: subject.subject_id,
    });

    const lecturer = await DB<ILecturerResponse>("lecturers")
      .where({ lecturer_id })
      .first();
    if (!lecturer) throw Error("Couldn't create lecturer");
    return lecturer;
  }

  public async getLecturers(): Promise<ILecturerResponse[]> {
    const lecturers = await DB<ILecturerResponse>("lecturers");
    return lecturers;
  }
}
