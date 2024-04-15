import { nanoid } from "nanoid";
import DB from "../DB/index";
import { ILecturer } from "../types";
import "dotenv/config";

export class LecturerService {
  public async getLecturerById(lecturer_id: string): Promise<ILecturer> {
    const lecturer = await DB<ILecturer>("lecturers")
      .where({ lecturer_id })
      .first();
    if (!lecturer) throw Error("Lecturer id is not valid");

    return lecturer;
  }

  public async createLecturer(lecturer_name: string, subject_id: string): Promise<ILecturer> {
    const lecturer_id = nanoid();
    await DB<ILecturer>("lecturers").insert({
      lecturer_id,
      lecturer_name,
      subject_id,
    });

    const lecturer = await DB<ILecturer>("lecturers")
      .where({ lecturer_id })
      .first();
    if (!lecturer) throw Error("Couldn't create lecturer");
    return lecturer;
  }

  public async getLecturers(): Promise<ILecturer[]> {
    const lecturers = await DB<ILecturer>("lecturers");
    return lecturers;
  }
}
