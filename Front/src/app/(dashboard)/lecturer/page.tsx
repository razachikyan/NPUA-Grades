"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import Arrow from "@public/icons/arrow.svg";
import { ILecturerResponse, IStudentResponse } from "@/types/user";
import { getData, tableHeaders, years } from "./constants";
import { groupOptions } from "@/components/features/form/types";
import { EvaluationService } from "@/services/evaluations";
import { LecturerService } from "@/services/lecturers";
import { IEvaluationResponse } from "@/types/evaluations";

import styles from "./styles.module.scss";

export default function Lecturer() {
  const [user, setUser] = useState<ILecturerResponse | null>(null);
  const [data, setData] = useState<string[][]>([]);
  const [group, setGroup] = useState<string>("020");
  const [year, setYear] = useState<number>(2022);
  const [semester, setSemester] = useState<number>(1);
  const [evaluations, setEvaluations] = useState<IEvaluationResponse[]>([]);
  const [students, setStudents] = useState<IStudentResponse[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const evaluationsServices = new EvaluationService();
  const lecturerServices = new LecturerService();
  const headers = tableHeaders;

  useEffect(() => {
    const load = async () => {
      const user = await lecturerServices.getUser();
      if (!user) router.push("/login");
      setUser(user);
    };

    load();
  }, []);

  useEffect(() => {
    if (user) {
      evaluationsServices
        .getEvaluationsByLecturerAndSemester(
          user.lecturer_id,
          year - 2020,
          semester
        )
        .then((res) => {
          Promise.all(
            res.map(async (item) => {
              return await lecturerServices.getStudentById(item.student_id);
            })
          ).then((res) => {
            const valid = res.filter((item) => item !== null);
            setStudents(valid as IStudentResponse[]);
          });
          setEvaluations(res);
        })
        .catch(() => setEvaluations([]));
    }
  }, [user]);

  useEffect(() => {}, [evaluations]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const yearParam = params.get("year");
    setYear(yearParam ? parseInt(yearParam, 10) : 2024);
    const semesterParam = params.get("semester");
    setSemester(semesterParam ? parseInt(semesterParam, 10) : 2);
    const groupParams = params.get("group");
    setGroup(groupParams ? groupParams : "920");
  }, [searchParams]);

  useEffect(() => {
    const data = getData(evaluations, students);
    console.log(evaluations, students);

    setData(data);
  }, [evaluations, students]);

  return (
    <>
      <main className={styles.lecturer}>
        <div className={styles.container}>
          {user && (
            <span className={styles.username}>{user.lecturer_name}</span>
          )}
          <div className={styles.selects}>
            <Select
              icon={Arrow}
              value={group}
              className={styles.select}
              cover="Խումբ"
              setValue={(val) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("group", val);
                router.replace(`${pathname}?${newParams.toString()}`);
              }}
              optionClassName={styles.option}
              options={groupOptions}
            />
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
          </div>
          <Table
            ableEdit
            onSubmit={() => {}}
            btnClassname={styles.tableBtn}
            bodyClassName={styles.body}
            headClassName={styles.head}
            className={styles.tableBox}
            tableClassName={styles.table}
            headers={headers}
            initialData={data}
          />
        </div>
      </main>
    </>
  );
}
