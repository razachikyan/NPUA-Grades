"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import Arrow from "@public/icons/arrow.svg";
import { UserServices } from "@/services/users";
import { IUser, IUserResponse } from "@/types/user";

import styles from "./styles.module.scss";
import { tableHeaders, years } from "./constants";
import { groupOptions } from "@/components/features/form/types";
import { EvaluationService } from "@/services/evaluations";
import { getStats } from "@/utils/helpers/getStats";
import { LecturerService } from "@/services/lecturers";

export default function Lecturer() {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [group, setGroup] = useState<string>("020");
  const [year, setYear] = useState<number>(2022);
  const [semester, setSemester] = useState<number>(1);
  const [data, setData] = useState<Array<string[]>>([]);
  const router = useRouter();

  const userServices = new UserServices();
  const evaluationsServices = new EvaluationService();
  const lecturerServices = new LecturerService();
  const headers = tableHeaders;

  useEffect(() => {
    const load = async () => {
      const user = await userServices.getUser();
      if (!user) router.push("/login");
      setUser(user);
    };

    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      const lecturer = await lecturerServices.getLecturerByUserId(
        user?.user_id ?? ""
      );
      if (!lecturer) return;

      const evaluations =
        await evaluationsServices.getEvaluationsBySubjectAndSemester(
          lecturer.subject_id,
          year - 2020,
          semester
        );

      const data = evaluations
        ? await Promise.all(
            evaluations?.map(async (item, i) => {
              const user = await userServices.getUserById(item.user_id);
              const { fin, frequencies, mij1, mij2 } = getStats(item.value);
              const status =
                item.value < 41
                  ? "Անբավարար"
                    ? item.value < 61
                    : "Բավարար"
                  : item.value < 81
                  ? "Լավ"
                  : "Գերազանց";
              return [
                i,
                `${user?.firstname} ${user?.lastname}`,
                frequencies,
                mij1,
                mij2,
                fin,
                item.value,
                status,
              ].map((it) => String(it));
            })
          )
        : [];

      setData(data);
    };

    load();
  }, [user]);

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
