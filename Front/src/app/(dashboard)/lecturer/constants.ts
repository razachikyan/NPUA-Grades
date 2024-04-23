import { IEvaluationResponse } from "@/types/evaluations";
import { IStudentResponse } from "@/types/user";
import { getCredit } from "@/utils/helpers/getCredit";

export const tableHeaders = [
  "Մատյանի համար",
  "Անուն Ազգանուն Հայրանուն",
  "Դասահաճախում",
  "Միջ․ 1",
  "Միջ․ 2",
  "Ամփ․ քն․",
  "Կիս․ առ․ռեյտինգ",
];

export const years = [2022, 2023, 2024];

export const getData = (
  evaluations: (IEvaluationResponse & IStudentResponse)[]
) => {
  return evaluations
    .map((evl) => {
      const hach = Math.ceil(evl.value / 10);
      const mij1 = Math.ceil(0.2 * evl.value);
      const mij2 = Math.floor(0.2 * evl.value);
      return [
        evl?.number,
        `${evl?.firstname} ${evl?.lastname} ${evl?.middlename}`,
        hach,
        mij1,
        mij2,
        evl.value - (mij1 + mij2 + hach),
        `${evl.value} (${getCredit(evl.value)})`,
        ,
      ].map((it) => String(it));
    })
    .sort((a, b) => Number(a[0]) - Number(b[0]));
};
