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
  ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import Arrow from "@public/icons/arrow.svg";
import { useEffect, useState } from "react";
import { Select } from "@/components/shared/select";
import { ILecturerResponse, IStudentResponse } from "@/types/user";
import { AdminServices } from "@/services/admin";
import { SubjectSevice } from "@/services/subjects";
import { LecturerService } from "@/services/lecturers";
import { IEvaluationResponse } from "@/types/evaluations";
import { labels } from "./constants";

import styles from "./styles.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics() {
  const [lecturers, setLecturers] = useState<ILecturerResponse[]>([]);
  const [lecturer, setLecturer] = useState<ILecturerResponse | null>(null);
  const [evaluations, setEvaluations] = useState<
    (IEvaluationResponse & IStudentResponse)[]
  >([]);
  const [data, setData] = useState<
    ChartData<"bar", (number | [number, number] | null)[], unknown>
  >({
    labels,
    datasets: [],
  });
  const adminServices = new AdminServices();
  const subjectServices = new SubjectSevice();
  const lecturerServices = new LecturerService();

  useEffect(() => {
    adminServices
      .getLecturers()
      .then((res) => setLecturers(res))
      .catch(() => setLecturers([]));
  }, []);

  useEffect(() => {
    if (lecturer && evaluations) {
      subjectServices
        .getSubjectsByLecturer(lecturer.lecturer_id)
        .then((res) => {
          const datasets = res.map((sub) => {
            const data920_2_1 = evaluations.filter(
              (item) =>
                item.subject_id === sub.subject_id &&
                item.group === "920" &&
                item.grade === 2 &&
                item.semester === 1
            );
            const data920_2_2 = evaluations.filter(
              (item) =>
                item.subject_id === sub.subject_id &&
                item.group === "920" &&
                item.grade === 2 &&
                item.semester === 2
            );
            const data920_3_1 = evaluations.filter(
              (item) =>
                item.subject_id === sub.subject_id &&
                item.group === "920" &&
                item.grade === 3 &&
                item.semester === 1
            );
            const data920_3_2 = evaluations.filter(
              (item) =>
                item.subject_id === sub.subject_id &&
                item.group === "920" &&
                item.grade === 3 &&
                item.semester === 2
            );
            const data920_4_1 = evaluations.filter(
              (item) =>
                item.subject_id === sub.subject_id &&
                item.group === "920" &&
                item.grade === 4 &&
                item.semester === 1
            );
            const data920_4_2 = evaluations.filter(
              (item) =>
                item.subject_id === sub.subject_id &&
                item.group === "920" &&
                item.grade === 4 &&
                item.semester === 2
            );

            const data = [
              data920_2_1.reduce((acc, itm) => acc + itm.value, 0) /
                data920_2_1.length,
              data920_2_2.reduce((acc, itm) => acc + itm.value, 0) /
                data920_2_2.length,
              data920_3_1.reduce((acc, itm) => acc + itm.value, 0) /
                data920_3_1.length,
              data920_3_2.reduce((acc, itm) => acc + itm.value, 0) /
                data920_3_2.length,
              data920_4_1.reduce((acc, itm) => acc + itm.value, 0) /
                data920_4_1.length,
              data920_4_2.reduce((acc, itm) => acc + itm.value, 0) /
                data920_4_2.length,
            ];
            return {
              data: data,
              label: sub.subject_name,
              fill: false,
              borderColor: "rgb(255, 102, 0)",
              backgroundColor: "rgb(0, 102, 255)",
              tension: 0.1,
            };
          });

          setData((prev) => ({ ...prev, datasets }));
        })
        .catch(() => {});
    }
  }, [lecturer, evaluations]);

  useEffect(() => {
    if (lecturer) {
      lecturerServices
        .getAllEvaluations(lecturer?.lecturer_id)
        .then((res) => setEvaluations(res))
        .catch(() => setEvaluations([]));
    }
  }, [lecturer]);

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
        <Chart
          options={{
            scales: {
              y: {
                min: 0,
                max: 100,
              },
            },
          }}
          data={data}
          type="bar"
        />
      </div>
    </main>
  );
}
