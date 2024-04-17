"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import Arrow from "@public/icons/arrow.svg";
import { UserServices } from "@/services/users";
import { IUser } from "@/types/user";
import { tableHeaders, years } from "./constants";
import { groupOptions } from "@/components/features/form/types";
import { SubjectSevice } from "@/services/subjects";
import { EvaluationService } from "@/services/evaluations";
import { getStats } from "@/utils/helpers/getStats";

import styles from "./styles.module.scss";
import { nanoid } from "nanoid";

export default function Student() {
  const [user, setUser] = useState<IUser | null>(null);
  const [group, setGroup] = useState<string>("020");
  const [year, setYear] = useState<number>(2022);
  const [semester, setSemester] = useState<number>(1);
  const [data, setData] = useState<Array<React.ReactNode[]>>([]);
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
          const { MOG, fin, frequencies, mij1, mij2, rating } = getStats(
            item.value
          );
          return [
            subject?.subject_name,
            frequencies,
            mij1,
            mij2,
            fin,
            rating,
            <div key={nanoid()} className={styles.cell}>
              <span>{MOG}</span>
              <span>({item.value})</span>
            </div>,
          ].map((item) => item);
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
