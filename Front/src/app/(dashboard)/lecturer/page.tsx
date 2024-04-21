"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import Arrow from "@public/icons/arrow.svg";
import { AdminServices } from "@/services/admin";
import { IUserResponse } from "@/types/user";
import { tableHeaders, years } from "./constants";
import { groupOptions } from "@/components/features/form/types";
import { EvaluationService } from "@/services/evaluations";
import { LecturerService } from "@/services/lecturers";

import styles from "./styles.module.scss";

export default function Lecturer() {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [group, setGroup] = useState<string>("020");
  const [year, setYear] = useState<number>(2022);
  const [semester, setSemester] = useState<number>(1);
  const [data, setData] = useState<Array<string[]>>([]);
  const router = useRouter();

  const adminServices = new AdminServices();
  const evaluationsServices = new EvaluationService();
  const lecturerServices = new LecturerService();
  const headers = tableHeaders;

  useEffect(() => {
    const load = async () => {
      const user = await adminServices.getUser();
      if (!user) router.push("/login");
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
