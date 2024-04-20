"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import { IStudent, IStudentResponse, TGroups } from "@/types/user";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { initialStudent, tableHeaders } from "./constants";
import { AdminServices } from "@/services/admin";
import { FormValidation } from "@/utils/helpers/validator";

import styles from "./styles.module.scss";

export default function StudentsStats() {
  const [newStudent, setNewStudent] = useState<IStudent>(initialStudent);
  const [students, setStudents] = useState<IStudentResponse[]>([]);
  const [year, setYear] = useState<number>(2024);
  const [group, setGroup] = useState<TGroups>("920");
  const [semester, setSemester] = useState<number>(2);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const adminServices = new AdminServices();
  const validator = new FormValidation();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("year", year.toString());
    newParams.set("group", group);
    newParams.set("semester", semester.toString());
    router.replace(`${pathname}?${newParams.toString()}`);

    adminServices
      .getStudents({ group, grade: year - 2020, semester })
      .then(({ data }: any) => {
        setStudents(
          data.map((item: any) => ({
            firstname: item.firstname,
            group: item.group,
            lastname: item.lastname,
            middlename: item.middlename,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, [year, group, semester]);

  const handleSubmit = async () => {
    const errors = validator.validateUser(newStudent).errors;
    if (errors) {
      setNewStudent(initialStudent);
      return;
    }

    await adminServices.addStudent(newStudent);
    setNewStudent(initialStudent);
    location.reload();
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const yearParam = params.get("year");
    setYear(yearParam ? parseInt(yearParam, 10) : 2024);
    const groupParam = params.get("group");
    setGroup((groupParam || "920") as TGroups);
    const semesterParam = params.get("semester");
    setSemester(semesterParam ? parseInt(semesterParam, 10) : 2);
  }, [searchParams]);

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
        initialData={students.map((stud, i) =>
          [
            i + 1,
            `${stud.firstname} ${stud.lastname} ${stud.middlename}`,
            stud.group,
            year - 2020,
            "ՏՀՏԷ",
          ].map((it) => String(it))
        )}
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
