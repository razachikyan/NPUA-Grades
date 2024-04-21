import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import DB from "../DB/index";
import { IStudent, IStudentResponse } from "../types";
import "dotenv/config";

export class StudentServices {
  public async login({
    nickname,
    password,
  }: Pick<IStudentResponse, "nickname" | "password">) {
    const user = await DB<IStudentResponse>("students")
      .where({
        nickname,
      })
      .first();
    if (!user) throw Error("User with this nickname doesn't exist");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw Error("Wrong password");
    const updatedCount = await DB<IStudentResponse>("students")
      .where({ nickname })
      .update({ session_id: nanoid() });

    if (updatedCount !== 1) throw new Error("Can't update user");

    const newUser = await DB<IStudentResponse>("students")
      .where({ nickname })
      .first();
    if (!newUser) throw Error("Database error");
    return newUser;
  }

  public async addStudent(data: IStudent): Promise<IStudent> {
    const student_id = nanoid();
    const nickname = `Student${data.number}`;
    const hashedPassword = await bcrypt.hash("aaa111", 10);
    await DB<IStudentResponse>("students").insert({
      firstname: data.firstname,
      group: data.group,
      lastname: data.lastname,
      middlename: data.middlename,
      number: data.number,
      password: hashedPassword,
      nickname: nickname,
      student_id,
    });

    const student = await DB<IStudentResponse>("students")
      .where({ student_id })
      .first();
    if (!student) throw Error("Couldn't create student");
    return student;
  }

  public async getStudent(session_id: string): Promise<IStudentResponse> {
    const student = await DB<IStudentResponse>("students")
      .where({ session_id })
      .first();
    if (!student) throw Error("session id is not valid");

    return student;
  }

  public async getStudents(
    group: string,
    grade: string,
    semester: string
  ): Promise<IStudentResponse[]> {
    const gradeNum = Number(grade),
      semesterNum = Number(semester);
    if (isNaN(gradeNum) || isNaN(semesterNum)) {
      throw Error("Invalid grade or semester");
    }
    const students = await DB<IStudentResponse>("students").where({ group });
    if (!students) throw Error("Error");

    return students;
  }

  public async updateStudent(student_id: string, student: IStudent) {
    const updatedLectCount = await DB<IStudentResponse>("students")
      .where({ student_id })
      .update(student);
    if (updatedLectCount !== 1) throw Error("Can't update user");
    const user = await DB<IStudentResponse>("students")
      .where({
        student_id,
      })
      .first();
    return user;
  }

  public async deleteStudent(student_id: string) {
    const students = await DB<IStudentResponse>("students")
      .where({ student_id })
      .delete();
  }
}
