"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/shared/select";
import { StudentServives } from "@/services/students";
import { IStudentResponse } from "@/types/user";
import { getTableData, tableHeaders, years } from "./constants";
import { Table } from "@/components/shared/table";
import { EvaluationService } from "@/services/evaluations";
import { IEvaluationResponse } from "@/types/evaluations";
import { ISubjectResponse } from "@/types/subjects";
import { SubjectSevice } from "@/services/subjects";

import styles from "./styles.module.scss";

export default function Student() {
  const [user, setUser] = useState<IStudentResponse | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [semester, setSemester] = useState<number>(2);
  const [evaluations, setEvauations] = useState<IEvaluationResponse[]>([]);
  const [subjects, setSubjects] = useState<ISubjectResponse[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const studentServices = new StudentServives();
  const evaluationServices = new EvaluationService();
  const subjectsServices = new SubjectSevice();

  useEffect(() => {
    const load = async () => {
      const user = await studentServices.getUser();
      if (!user) router.push("/login/non-admin");
      setUser(user);
      subjectsServices
        .getSubjects()
        .then((res) => setSubjects(res))
        .catch(() => setSubjects([]));
    };

    load();
  }, []);

  useEffect(() => {
    if (user) {
      evaluationServices
        .getEvaluationsByUserAndSemester(user.student_id, year - 2020, semester)
        .then((res) => setEvauations(res))
        .catch(() => setEvauations([]));
    }
  }, [user, year, semester]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const yearParam = params.get("year");
    setYear(yearParam ? parseInt(yearParam, 10) : 2024);
    const semesterParam = params.get("semester");
    setSemester(semesterParam ? parseInt(semesterParam, 10) : 2);
  }, [searchParams]);

  return (
    <>
      <main className={styles.student}>
        <div className={styles.container}>
          {user && (
            <span className={styles.username}>
              {user.firstname} {user.lastname} {user.middlename}
            </span>
          )}
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
          </div>
          <Table
            className={styles.tableBox}
            tableClassName={styles.table}
            bodyClassName={styles.body}
            headClassName={styles.head}
            initialData={getTableData(evaluations, subjects)}
            headers={tableHeaders}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <nav className={styles.nav}>
          <Link className={styles.link} href="/student">
            Student page
          </Link>
          <Link className={styles.link} href="/login/non-admin">
            Log in page
          </Link>
        </nav>
      </footer>
    </>
  );
}
