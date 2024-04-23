"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import Arrow from "@public/icons/arrow.svg";
import { useEffect, useState } from "react";
import { EvaluationService } from "@/services/evaluations";
import { Select } from "@/components/shared/select";
import { ILecturerResponse, IStudentResponse } from "@/types/user";
import { AdminServices } from "@/services/admin";
import { ISubjectResponse } from "@/types/subjects";
import { SubjectSevice } from "@/services/subjects";
import { LecturerService } from "@/services/lecturers";
import { IEvaluationResponse } from "@/types/evaluations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import styles from "./styles.module.scss";
import { labels } from "./constants";

export default function Statistics() {
  const [lecturers, setLecturers] = useState<ILecturerResponse[]>([]);
  const [lecturer, setLecturer] = useState<ILecturerResponse | null>(null);
  const [subjects, setSubjects] = useState<ISubjectResponse[]>([]);
  const [evaluations, setEvaluations] = useState<
    (IEvaluationResponse & IStudentResponse)[]
  >([]);
  const [values, setValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [subject, setSubject] = useState<ISubjectResponse | null>(null);
  const adminServices = new AdminServices();
  const subjectServices = new SubjectSevice();
  const lecturerServices = new LecturerService();
  const data = {
    labels: labels,
    datasets: [
      // subjects
      //   .filter((itm) => itm.subject_id === lecturer?.subject_id)
      //   .map((itm) => ({
      //     label: "Դասախոսի վիճակագրություն",
      //     data: [...values, 0, 0, 0, 0, 0, 0],
      //     fill: false,
      //     backgroundColor: "rgb(0, 102, 255)",
      //     tension: 0.1,
      //   })),
      {
        label: "Subject 1",
        data: [...values, 90, 10, 60, 30, 20, 10],
        fill: false,
        borderColor: "rgb(255, 102, 0)",
        backgroundColor: "rgb(0, 102, 255)",
        tension: 0.1,
      },
      {
        label: "Subject 2",
        data: [...values, 90, 10, 60, 30, 20, 10],
        fill: false,
        borderColor: "rgb(255, 102, 0)",
        backgroundColor: "rgb(0, 102, 255)",
        tension: 0.1,
      },
      {
        label: "Subject 3",
        data: [...values, 90, 10, 60, 30, 20, 10],
        fill: false,
        borderColor: "rgb(255, 102, 0)",
        backgroundColor: "rgb(0, 102, 255)",
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    adminServices
      .getLecturers()
      .then((res) => setLecturers(res))
      .catch(() => setLecturers([]));
  }, []);

  useEffect(() => {
    if (lecturer) {
      subjectServices
        .getSubjectsByLecturer(lecturer.lecturer_id)
        .then((res) => {
          setSubjects(res);
        })
        .catch(() => setSubjects([]));
    }
  }, [lecturer]);

  useEffect(() => {
    if (lecturer && subject) {
      lecturerServices
        .getEvaluationsBySubject(lecturer.lecturer_id, subject.subject_id)
        .then((res) => {
          const G920_2_1 = res.filter(
            (itm) =>
              itm.group === "920" && itm.grade === 2 && itm.semester === 1
          );
          const G920_2_2 = res.filter(
            (itm) =>
              itm.group === "920" && itm.grade === 2 && itm.semester === 2
          );
          const G920_3_1 = res.filter(
            (itm) =>
              itm.group === "920" && itm.grade === 3 && itm.semester === 1
          );
          const G920_3_2 = res.filter(
            (itm) =>
              itm.group === "920" && itm.grade === 3 && itm.semester === 2
          );
          const G920_4_1 = res.filter(
            (itm) =>
              itm.group === "920" && itm.grade === 4 && itm.semester === 1
          );
          const G920_4_2 = res.filter(
            (itm) =>
              itm.group === "920" && itm.grade === 4 && itm.semester === 2
          );
          setValues(
            [G920_2_1, G920_2_2, G920_3_1, G920_3_2, G920_4_1, G920_4_2].map(
              (gr) => gr.reduce((acc, val) => acc + val.value, 0) / gr.length
            )
          );
        })
        .catch(() => setEvaluations([]));
    }
  }, [lecturer, subject]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.selects}>
          <Select
            icon={Arrow}
            value={lecturer?.lecturer_name ?? ""}
            className={styles.select}
            cover="Դասախոս"
            setValue={(val) => {
              const lect = lecturers.find((item) => item.lecturer_name === val);
              lect && setLecturer(lect);
            }}
            optionClassName={styles.option}
            options={lecturers.map((lect) => lect.lecturer_name)}
          />
        </div>
        <Chart data={data} type="bar" />
      </div>
    </main>
  );
}
