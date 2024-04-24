import DB from "../DB/index";
import { IEvaluation, IStudentResponse, ISubjectResponse } from "../types";
import "dotenv/config";

export class EvaluationService {
  public async getEvaluationsByUser(
    student_id: string,
    semester: string
  ): Promise<IEvaluation> {
    const semesterNum = Number(semester);
    if (isNaN(semesterNum)) throw Error("Invalid semester");
    const evaluation = await DB<IEvaluation>("evaluations")
      .where({ student_id, semester: semesterNum })
      .first();
    if (!evaluation) throw Error("Userid or semester is not valid");

    return evaluation;
  }

  public async getEvaluationsBySemester(
    grade: string,
    semester: string
  ): Promise<IEvaluation[]> {
    const gradeNum = Number(grade);
    const semesterNum = Number(semester);
    if (isNaN(gradeNum) || isNaN(semesterNum))
      throw Error("invalid grade or semester");
    const evaluations = await DB<IEvaluation>("evaluations").where({
      grade: gradeNum,
      semester: semesterNum,
    });
    if (!evaluations) throw Error("Evaluation id is not valid");

    return evaluations;
  }
  public async getEvaluationsBySemesterAndUser(
    grade: string,
    semester: string,
    student_id: string
  ): Promise<IEvaluation[]> {
    const gradeNum = Number(grade);
    const semesterNum = Number(semester);
    if (isNaN(gradeNum) || isNaN(semesterNum))
      throw Error("invalid grade or semester");
    const evaluation = await DB<IEvaluation>("evaluations").where({
      grade: gradeNum,
      semester: semesterNum,
      student_id,
    });
    if (!evaluation) throw Error("Evaluation id is not valid");

    return evaluation;
  }
  public async getEvaluationsByLecturerAndSemester(
    grade: string,
    semester: string,
    lecturer_id: string
  ): Promise<IEvaluation[]> {
    const gradeNum = Number(grade);
    const semesterNum = Number(semester);
    if (isNaN(gradeNum) || isNaN(semesterNum))
      throw Error("invalid grade or semester");
    const evaluation = await DB<IEvaluation>("evaluations").where({
      grade: gradeNum,
      semester: semesterNum,
      lecturer_id,
    });

    if (!evaluation) throw Error("Evaluation id is not valid");

    return evaluation;
  }

  public async addEvaluation(
    evaluationData: IEvaluation
  ): Promise<IEvaluation> {
    const { grade, semester, student_id } = evaluationData;
    await DB<IEvaluation>("evaluations").insert(evaluationData);

    const evaluation = await DB<IEvaluation>("evaluations")
      .where({ grade, semester, student_id })
      .first();

    if (!evaluation) throw Error("Couldn't create evaluation");
    return evaluation;
  }

  public async getEvaluationsByGroup(
    group: string
  ): Promise<(IEvaluation & IStudentResponse & ISubjectResponse)[]> {
    const evaluations = await DB<IEvaluation>("evaluations as e")
      .select({
        evaluation: "e.*",
        student: "s.*",
        subject: "sub.*",
      })
      .leftJoin("students as s", "e.student_id", "s.student_id")
      .leftJoin("subjects as sub", "e.subject_id", "sub.subject_id")
      .where("s.group", "=", group);

    if (!evaluations) throw Error("Couldn't retrieve evaluations");

    return evaluations;
  }

  public async changeEvaluation(
    evaluationData: IEvaluation
  ): Promise<IEvaluation> {
    const { grade, lecturer_id, semester, subject_id, value, student_id } =
      evaluationData;
    const evaluationC = await DB<IEvaluation>("evaluations")
      .where({ grade, semester, student_id, lecturer_id, subject_id })
      .update({ value });

    if (evaluationC !== 1) throw Error("Couldn't create evaluation");

    const evaluation = await DB<IEvaluation>("evaluations")
      .where({
        grade,
        semester,
        student_id,
        lecturer_id,
        subject_id,
      })
      .first();
    if (!evaluation) throw Error("Couldn't create evaluation");
    return evaluation;
  }

  public async getEvaluations({
    group,
    grade,
    semester,
  }: {
    group: string;
    grade: string;
    semester: string;
  }): Promise<(IEvaluation & IStudentResponse & ISubjectResponse)[]> {
    const semesterNum = Number(semester);
    const gradeNum = Number(grade);
    if (isNaN(gradeNum) || isNaN(semesterNum)) throw Error("Invalid semester");

    const students = await DB<IStudentResponse>("students").where({
      group,
    });
    if (!students.length) return [];

    const studentIds = students.map((student) => student.student_id);

    const evaluations = await DB<
      IEvaluation & IStudentResponse & ISubjectResponse
    >("evaluations as e")
      .select({
        evaluation: "e.*",
        student: "s.*",
        subject: "sub.*",
      })
      .leftJoin("students as s", "e.student_id", "s.student_id")
      .leftJoin("subjects as sub", "e.subject_id", "sub.subject_id")
      .whereIn("e.student_id", studentIds)
      .andWhere({
        grade,
        semester,
      });

    return evaluations;
  }
}
