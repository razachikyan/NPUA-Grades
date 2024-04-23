import { IEvaluationResponse } from "@/types/evaluations";
import { ISubjectResponse } from "@/types/subjects";
import { IStudentResponse } from "@/types/user";
import { getUniq } from "@/utils/helpers/getUniq";

export const getChartData = (
  data: (IEvaluationResponse & IStudentResponse & ISubjectResponse)[]
): { labels: string[]; data: number[] } => {
  const studentIds = getUniq(data.map((itm) => itm.student_id));
  const subjectIds = getUniq(data.map((itm) => itm.subject_id));
  const mogs = studentIds.map((stdId) => {
    const studentValsAndCreds = subjectIds
      .map((subId) =>
        data.find((ev) => ev.student_id === stdId && ev.subject_id === subId)
      )
      .map((ev) => ({
        value: ev?.value,
        credit: ev?.credit,
      }));
    const leftSide = studentValsAndCreds.reduce((acc, { credit, value }) => {
      if (!credit || !value) return acc;
      return acc + credit * value;
    }, 0);

    const rightSide = studentValsAndCreds.reduce((acc, { credit }) => {
      return credit ? acc + credit : acc;
    }, 0);

    return leftSide / rightSide;
  });
  const labels = studentIds
    .map((id) => data.find((item) => item.student_id === id))
    .map((item) => `${item?.firstname} ${item?.lastname} ${item?.middlename}`);

  return { labels, data: mogs };
};
