import { nanoid } from "nanoid";
import DB from "../DB/index";
import { ILecturer, ILecturerResponse, ISubjectResponse } from "../types";
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

  public async editLecturer(
    lecturer_id: string,
    lecturer: ILecturer & { subject: string }
  ) {
    const subject = await DB<ISubjectResponse>("subjects")
      .where({
        subject_name: lecturer.subject,
      })
      .first();

    if (!subject) throw Error("Invalid subject name");

    const updatedLectCount = await DB<ILecturerResponse>("lecturers")
      .where({ lecturer_id })
      .update({
        lecturer_name: lecturer.lecturer_name,
      });
    const updatedSubCount = await DB<ISubjectResponse>("subjects")
      .where({
        lecturer_id,
      })
      .update({
        subject_name: lecturer.subject,
      });
    if (updatedLectCount !== 1 || updatedSubCount !== 1)
      throw Error("Can't update user");
    const user = await DB<ILecturerResponse>("lecturers")
      .where({
        lecturer_id,
      })
      .first();
    return user;
  }

  public async createLecturer(
    data: ILecturer & { subject: string }
  ): Promise<ILecturerResponse> {
    const lecturer_id = nanoid();

    await DB<ILecturerResponse>("lecturers").insert({
      lecturer_id,
      lecturer_name: data.lecturer_name,
    });

    const lecturer = await DB<ILecturerResponse>("lecturers")
      .where({ lecturer_id })
      .first();
    if (!lecturer) throw Error("Couldn't create lecturer");

    const subject_id = nanoid();
    await DB<ISubjectResponse>("subjects").insert({
      lecturer_id: lecturer.lecturer_id,
      subject_name: data.subject,
      subject_id,
    });

    return lecturer;
  }

  public async getLecturers(): Promise<ILecturerResponse[]> {
    const lecturers = await DB<ILecturerResponse>("lecturers");
    return lecturers;
  }

  public async deleteLecturer(lecturer_id: string) {
    await DB<ILecturerResponse>("lecturers").where({ lecturer_id }).delete();
  }
}
