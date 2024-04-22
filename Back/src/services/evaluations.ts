import DB from "../DB/index";
import { IEvaluation } from "../types";
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

  public async getEvaluations(): Promise<IEvaluation[]> {
    const evaluations = await DB<IEvaluation>("evaluations");
    return evaluations;
  }
}
