"use client";

import { useEffect, useState } from "react";
import { ILecturer, ILecturerResponse } from "@/types/user";
import { Select } from "@/components/shared/select";
import { Table } from "@/components/shared/table";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { initialLecturer, tableHeaders } from "./constants";
import { ISubjectResponse } from "@/types/subjects";
import { SubjectSevice } from "@/services/subjects";
import { AdminServices } from "@/services/admin";
import { FormValidation } from "@/utils/helpers/validator";

import styles from "./styles.module.scss";

export default function StudentsStats() {
  const [newLecturer, setNewLecturer] = useState<ILecturer>(initialLecturer);
  const [lecturers, setLecturers] = useState<ILecturerResponse[]>([]);
  const [subjects, setSubjects] = useState<ISubjectResponse[]>([]);
  const subjectServices = new SubjectSevice();
  const adminServices = new AdminServices();
  const validator = new FormValidation();

  useEffect(() => {
    subjectServices
      .getSubjects()
      .then((res) => {
        setSubjects(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    adminServices
      .getLecturers()
      .then((res) => {
        setLecturers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async () => {
    const errors = validator.validateLecturer(newLecturer).errors;

    if (errors) {
      setNewLecturer(initialLecturer);
      return;
    }

    await adminServices.addLecturer(newLecturer);
    setNewLecturer(initialLecturer);
    location.reload();
  };

  const handleUpdate = async (data: string[], index: number) => {
    const [lecturer_name, subject_name] = data;
    const updatet = lecturers[index];
    console.log(updatet);

    const subject = subjects.find((sub) => sub.subject_name === subject_name);

    if (!updatet || !subject || updatet.subject_id !== subject.subject_id)
      return;

    await adminServices.editLecturer(updatet.lecturer_id, {
      lecturer_name,
      subject: subject_name,
    });
    // location.reload();
  };

  return (
    <div className={styles.container}>
      <Table
        ableEdit
        onSubmit={handleUpdate}
        className={styles.tableBox}
        btnClassname={styles.tableBtn}
        tableClassName={styles.table}
        bodyClassName={styles.body}
        headClassName={styles.head}
        initialData={lecturers.map((lect) =>
          [
            lect.lecturer_name,
            subjects.find((sub) => sub.subject_id === lect.subject_id)
              ?.subject_name,
          ].map((it) => String(it))
        )}
        headers={tableHeaders}
      />
      <form className={styles.newLecturer}>
        <div className={styles.inputBox}>
          <Input
            className={styles.input}
            placeholder="Անուն Ազգանուն"
            value={newLecturer.lecturer_name}
            handleChange={(val) =>
              setNewLecturer((prev) => ({ ...prev, lecturer_name: val }))
            }
          />
        </div>
        <Select
          className={styles.lecturerSelect}
          optionClassName={styles.lecturerOption}
          value={newLecturer.subject}
          cover="Առարկա"
          options={subjects.map((item) => item.subject_name)}
          setValue={(val) =>
            setNewLecturer((prev) => ({ ...prev, subject: val }))
          }
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
