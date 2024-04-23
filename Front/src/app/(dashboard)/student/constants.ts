import { IEvaluationResponse } from "@/types/evaluations";
import { ISubjectResponse } from "@/types/subjects";
import { getCredit } from "@/utils/helpers/getCredit";

export const tableHeaders = [
  "Առարկա",
  "Դասահաճախում",
  "Միջ․ 1",
  "Միջ․ 2",
  "Ամփ․ քն․",
  "Կիս․ առ․ռեյտինգ",
];

export const years = [2022, 2023, 2024];

export const getTableData = (
  evaluations: IEvaluationResponse[],
  subjects: ISubjectResponse[]
) => {
  return evaluations.map((item) => {
    const hach = Math.ceil(item.value / 10);
    const mij1 = Math.ceil(0.2 * item.value);
    const mij2 = Math.floor(0.2 * item.value);
    const subject_name = subjects.find(
      (s) => s.subject_id === item.subject_id
    )?.subject_name;
    return [
      subject_name,
      hach,
      mij1,
      mij2,
      item.value - (mij1 + mij2 + hach),
      `${item.value} (${getCredit(item.value)})`,
    ].map((it) => String(it));
  });
};
