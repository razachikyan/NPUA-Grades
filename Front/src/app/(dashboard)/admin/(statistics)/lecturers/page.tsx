"use client";

import { useState } from "react";
import { TGroups } from "@/types/user";

import styles from "./styles.module.scss";
import { Select } from "@/components/shared/select";
import { Table } from "@/components/shared/table";
import { tableHeaders } from "./constants";

export default function StudentsStats() {
  const [year, setYear] = useState<number>(2024);
  const [group, setGroup] = useState<TGroups>("020");
  const [semester, setSemester] = useState<number>(2);

  return (
    <div className={styles.container}>
      <div className={styles.selects}>
        <Select
          className={styles.select}
          optionClassName={styles.option}
          value={year}
          cover="Տարեթիվ"
          options={[2022, 2023, 2024]}
          setValue={setYear}
        />
        <Select
          className={styles.select}
          optionClassName={styles.option}
          value={group}
          cover="Խումբ"
          options={["020", "920"]}
          setValue={setGroup}
        />
        <Select
          className={styles.select}
          optionClassName={styles.option}
          value={semester}
          cover="Կիսամյակ"
          options={[1, 2]}
          setValue={setSemester}
        />
      </div>
      <Table
        className={styles.table}
        bodyClassName={styles.body}
        headClassName={styles.head}
        initialData={[]}
        headers={tableHeaders}
      />
    </div>
  );
}
