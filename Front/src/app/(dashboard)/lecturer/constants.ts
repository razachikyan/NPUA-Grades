import { IEvaluationResponse } from "@/types/evaluations";
import { IStudentResponse } from "@/types/user";
import { getMog } from "@/utils/helpers/getMog";

export const tableHeaders = [
  "Մատյանի համար",
  "Անուն Ազգանուն Հայրանուն",
  "Միջ․ 1",
  "Միջ․ 2",
  "Ամփ․ քն․",
  "Կիս․ առ․ռեյտինգ",
  "Կիս․ ՄՈԳ",
];

export const years = [2022, 2023, 2024];

export const getData = (
  evaluations: (IEvaluationResponse & IStudentResponse)[]
) => {
  return evaluations.map((evl) => {
    const mij1 = Math.ceil(0.2 * evl.value);
    const mij2 = Math.floor(0.2 * evl.value);
    return [
      evl?.number,
      `${evl?.firstname} ${evl?.lastname} ${evl?.middlename}`,
      mij1,
      mij2,
      evl.value - (mij1 + mij2 + Math.ceil(evl.value / 10)),
      evl.value,
      getMog(evl.value),
    ].map((it) => String(it));
  });
};
