import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import DB from "../DB/index";
import { ILecturer, ILecturerResponse, ISubjectResponse } from "../types";
import "dotenv/config";

export class LecturerService {
  public async login({
    nickname,
    password,
  }: Pick<ILecturerResponse, "nickname" | "password">) {
    const user = await DB<ILecturerResponse>("lecturers")
      .where({
        nickname,
      })
      .first();
    if (!user) throw Error("User with this nickname doesn't exist");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw Error("Wrong password");
    return user;
  }

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

    const hashedPassword = await bcrypt.hash("aaa111", 10);
    await DB<ILecturerResponse>("lecturers").insert({
      lecturer_id,
      lecturer_name: data.lecturer_name,
      nickname: "aaa111",
      password: hashedPassword,
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
