"use client";

import { useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import { IStudent, TGroups } from "@/types/user";
import { initialStudent, tableHeaders } from "./constants";

import styles from "./styles.module.scss";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { AdminServices } from "@/services/admin";
import { FormValidation } from "@/utils/helpers/validator";

export default function StudentsStats() {
  const [year, setYear] = useState<number>(2024);
  const [group, setGroup] = useState<TGroups>("020");
  const [semester, setSemester] = useState<number>(2);
  const [newStudent, setNewStudent] = useState<IStudent>(initialStudent);
  const adminServices = new AdminServices();
  const validator = new FormValidation();
  const handleSubmit =async () => {
    const errors = validator.validateStudent(newStudent);
    if (errors) {
      setNewStudent(initialStudent);
      return;
    }
    const user = await adminServices.addStudent(newStudent)
  };

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
      <form className={styles.newStudent}>
        <Input
          className={styles.input}
          placeholder="Անուն"
          value={newStudent.firstname}
          handleChange={(val) =>
            setNewStudent((prev) => ({ ...prev, firstname: val }))
          }
        />
        <Input
          className={styles.input}
          placeholder="Ազգանուն"
          value={newStudent.lastname}
          handleChange={(val) =>
            setNewStudent((prev) => ({ ...prev, lastname: val }))
          }
        />
        <Input
          className={styles.input}
          placeholder="Հայրանուն"
          value={newStudent.middlename}
          handleChange={(val) =>
            setNewStudent((prev) => ({ ...prev, middlename: val }))
          }
        />
        <Select
          className={styles.studentSelect}
          optionClassName={styles.studentOption}
          value={newStudent.group}
          cover="Խումբ"
          options={["020", "920"]}
          setValue={(val) => setNewStudent((prev) => ({ ...prev, group: val }))}
        />
        <Button
          btnType="submit"
          text="Ավելացնել"
          className={styles.addBtn}
          handleClick={(ev) => {
            ev.preventDefault();
            handleSubmit();
          }}
        />
      </form>
    </div>
  );
}
