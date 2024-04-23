"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import { groupOptions } from "@/components/features/form/types";
import Arrow from "@public/icons/arrow.svg";
import { ILecturerResponse, IStudentResponse } from "@/types/user";
import { getData, tableHeaders, years } from "./constants";
import { LecturerService } from "@/services/lecturers";
import { IEvaluationResponse } from "@/types/evaluations";

import styles from "./styles.module.scss";

export default function Lecturer() {
  const [user, setUser] = useState<ILecturerResponse | null>(null);
  const [data, setData] = useState<string[][]>([]);
  const [dataObj, setDataObj] = useState<
    (IEvaluationResponse & IStudentResponse)[]
  >([]);
  const [group, setGroup] = useState<string>("020");
  const [year, setYear] = useState<number>(2023);
  const [semester, setSemester] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const lecturerServices = new LecturerService();
  const headers = tableHeaders;

  useEffect(() => {
    const load = async () => {
      const user = await lecturerServices.getUser();
      if (!user) router.push("/login/non-admin");
      setUser(user);
    };

    load();
  }, []);

  useEffect(() => {
    if (user) {
      lecturerServices
        .getEvaluations(user.lecturer_id, year - 2020, semester)
        .then((res) => {
          setDataObj(res);
          const data = getData(res);
          setData(data);
        })
        .catch(() => setData([]));
    }
  }, [user, semester, group, year]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const yearParam = params.get("year");
    setYear(yearParam ? parseInt(yearParam, 10) : 2024);
    const semesterParam = params.get("semester");
    setSemester(semesterParam ? parseInt(semesterParam, 10) : 2);
    const groupParams = params.get("group");
    setGroup(groupParams ? groupParams : "920");
  }, [searchParams]);

  const handleSubmit = async (
    type: "change" | "remove",
    _: number,
    row?: string[]
  ) => {
    const [num] = row ?? [-1];
    const item = dataObj.find((ev) => ev.number === Number(num));
    if (
      user &&
      row &&
      !isNaN(Number(row.reverse()[0])) &&
      item &&
      type === "change"
    ) {
      const res = await lecturerServices.evaluate({
        grade: year - 2020,
        lecturer_id: user.lecturer_id,
        semester,
        student_id: item.student_id,
        subject_id: item.subject_id,
        value: Number(row[1]),
      });
      location.reload();
    }
  };

  const store = () => {
    const data: {
      subject_id: string;
      value: number;
      grade: number;
      semester: number;
      lecturer_id: string;
      student_id: string;
    }[] = [];

    data.forEach((item) => {
      setTimeout(async () => {
        const element = await lecturerServices.addEvaluation(item);
        console.log(element);
      }, 2000);
    });
  };

  return (
    <>
      <main className={styles.lecturer}>
        <button
          style={{
            padding: 10,
            backgroundColor: "red",
            color: "#fff",
            fontWeight: 600,
            fontSize: 30,
          }}
          onClick={() => store()}
        >
          Store
        </button>
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
            editCell={5}
            onSubmit={handleSubmit}
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
