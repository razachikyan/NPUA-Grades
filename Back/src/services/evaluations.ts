import DB from "../DB/index";
import { IEvaluation } from "../types";
import "dotenv/config";

export class EvaluationService {
  public async getEvaluationsByUser(
    user_id: string,
    semester: string
  ): Promise<IEvaluation> {
    const semesterNum = Number(semester);
    if (isNaN(semesterNum)) throw Error("Invalid semester");
    const evaluation = await DB<IEvaluation>("evaluations")
      .where({ user_id, semester: semesterNum })
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
    const evaluations = await DB<IEvaluation>("evaluations")
      .where({ grade: gradeNum, semester: semesterNum })
    if (!evaluations) throw Error("Evaluation id is not valid");

    return evaluations;
  }
  public async getEvaluationsBySemesterAndUser(
    grade: string,
    semester: string,
    user_id:string
  ): Promise<IEvaluation[]> {
    const gradeNum = Number(grade);
    const semesterNum = Number(semester);
    if (isNaN(gradeNum) || isNaN(semesterNum))
      throw Error("invalid grade or semester");
    const evaluation = await DB<IEvaluation>("evaluations")
      .where({ grade: gradeNum, semester: semesterNum, user_id })
    if (!evaluation) throw Error("Evaluation id is not valid");

    return evaluation;
  }

  public async addEvaluation(
    evaluationData: IEvaluation
  ): Promise<IEvaluation> {
    const { grade, semester, user_id } = evaluationData;
    await DB<IEvaluation>("evaluations").insert(evaluationData);

    const evaluation = await DB<IEvaluation>("evaluations")
      .where({ grade, semester, user_id })
      .first();

    if (!evaluation) throw Error("Couldn't create evaluation");
    return evaluation;
  }

  public async getEvaluations(): Promise<IEvaluation[]> {
    const evaluations = await DB<IEvaluation>("evaluations");
    return evaluations;
  }
}
