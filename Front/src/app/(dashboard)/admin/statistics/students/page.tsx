"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/shared/select";
import { StudentServives } from "@/services/students";
import { Table } from "@/components/shared/table";
import { EvaluationService } from "@/services/evaluations";
import { IEvaluationResponse } from "@/types/evaluations";
import { ISubjectResponse } from "@/types/subjects";
import { SubjectSevice } from "@/services/subjects";
import { getMog } from "@/utils/helpers/getMog";
import { years } from "@/app/(dashboard)/lecturer/constants";
import { tableHeaders } from "./constants";

import styles from "./styles.module.scss";
import { TGroups } from "@/types/user";

export default function Student() {
  const [year, setYear] = useState<number>(2024);
  const [semester, setSemester] = useState<number>(2);
  const [evaluations, setEvauations] = useState<IEvaluationResponse[]>([]);
  const [subjects, setSubjects] = useState<ISubjectResponse[]>([]);
  const [group, setGroup] = useState<TGroups>("920");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const evaluationServies = new EvaluationService();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const yearParam = params.get("year");
    setYear(yearParam ? parseInt(yearParam, 10) : 2024);
    const semesterParam = params.get("semester");
    setSemester(semesterParam ? parseInt(semesterParam, 10) : 2);
  }, [searchParams]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.selects}>
          <Select
            value={year}
            cover="Տարեթիվ"
            options={years}
            setValue={(val) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("year", val);
              router.replace(`${pathname}?${newParams.toString()}`);
            }}
            className={styles.select}
            optionClassName={styles.option}
          />
          <Select
            value={semester}
            cover="Կիսամյակ"
            options={[1, 2]}
            setValue={(val) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("semester", val);
              router.replace(`${pathname}?${newParams.toString()}`);
            }}
            className={styles.select}
            optionClassName={styles.option}
          />
          <Select
            value={group}
            cover="Խումբ"
            options={["020", "920"]}
            setValue={(val) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("group", val);
              router.replace(`${pathname}?${newParams.toString()}`);
            }}
            className={styles.select}
            optionClassName={styles.option}
          />
        </div>
        <Table
          className={styles.tableBox}
          tableClassName={styles.table}
          bodyClassName={styles.body}
          headClassName={styles.head}
          initialData={evaluations.map((item) => {
            const hach = Math.ceil(item.value / 10);
            const mij1 = Math.floor((item.value - hach) / 4);
            const mij2 = Math.ceil((item.value - hach) / 4);
            return [
              subjects.find((s) => s.subject_id === item.subject_id)
                ?.subject_name,
              hach,
              mij1,
              mij2,
              item.value - (mij1 + mij2 + hach),
              item.value,
              getMog(item.value),
            ].map((it) => String(it));
          })}
          headers={tableHeaders}
        />
      </div>
    </>
  );
}
