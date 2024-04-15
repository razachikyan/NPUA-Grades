"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import Arrow from "@public/icons/arrow.svg";
import { UserServices } from "@/services/users";
import { ISubject, IUser } from "@/types/user";
import { tableHeaders, years } from "./constants";
import { groupOptions } from "@/components/features/form/types";
import { SubjectSevice } from "@/services/subjects";
import { EvaluationService } from "@/services/evaluations";
import { getRating } from "@/utils/helpers/getRating";

import styles from "./styles.module.scss";

export default function Student() {
  const [user, setUser] = useState<IUser | null>(null);
  const [group, setGroup] = useState<string>("020");
  const [subject, setSubject] = useState<string>("Առարկա");
  const [year, setYear] = useState<number>(2022);
  const [semester, setSemester] = useState<number>(1);
  const [data, setData] = useState<Array<string[]>>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const router = useRouter();

  const userServices = new UserServices();
  const subjectServices = new SubjectSevice();
  const evaluationsServices = new EvaluationService();
  const headers = tableHeaders;

  useEffect(() => {
    const load = async () => {
      const user = await userServices.getUser();
      if (!user) router.push("/login");
      const subjects = await subjectServices.getSubjects();
      setSubjects(subjects ?? []);
      const evaluations =
        await evaluationsServices.getEvaluationsByUserAndSemester(
          user?.user_id ?? "",
          year - 2020,
          semester
        );

      const data =
        evaluations?.map((item) => {
          const subject = subjects?.find(
            (sub) => sub.subject_id === item.subject_id
          );
          const frequencies = Math.floor(item.value / 10);
          const mij1 = Math.floor(item.value / 2);
          const mij2 = Math.ceil(item.value / 2);
          const fin = item.value - frequencies;
          const { rating, MOG } = getRating(item.value);
          return [
            String(subject?.subject_name),
            String(frequencies),
            String(mij1),
            String(mij2),
            String(fin),
            String(rating),
            String(MOG),
            "0",
          ];
        }) ?? [];

      setData(data);
      setUser(user);
    };

    load();
  }, []);

  return (
    <div className={styles.container}>
      {user && (
        <span className={styles.username}>
          {user.firstname} {user.lastname}
        </span>
      )}
      <div className={styles.selects}>
        <Select
          icon={Arrow}
          value={group}
          className={styles.select}
          cover="Խումբ"
          setValue={setGroup as (value: string | number) => void}
          optionClassName={styles.option}
          options={groupOptions}
        />
        <Select
          icon={Arrow}
          value={year}
          className={styles.select}
          setValue={setYear as (value: string | number) => void}
          cover="Տարեթիվ"
          optionClassName={styles.option}
          options={years}
        />
        <Select
          icon={Arrow}
          value={semester}
          className={styles.select}
          setValue={setSemester as (value: string | number) => void}
          cover="Կիսամյակ"
          optionClassName={styles.option}
          options={[1, 2]}
        />
      </div>
      <Table
        bodyClassName={styles.body}
        headClassName={styles.head}
        className={styles.table}
        headers={headers}
        initialData={data}
      />
    </div>
  );
}
