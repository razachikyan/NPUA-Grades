"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
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
import Arrow from "@public/icons/arrow.svg";
import { EvaluationService } from "@/services/evaluations";
import { Select } from "@/components/shared/select";
import { TGroups } from "@/types/user";

import styles from "./styles.module.scss";
import { getUniq } from "@/utils/helpers/getUniq";

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
  const [group, setGroup] = useState<TGroups>("920");
  const [year, setYear] = useState<number>(2024);
  const [semester, setSemester] = useState<number>(2);
  const [data, setData] = useState<
    ChartData<"bar", (number | [number, number] | null)[], unknown>
  >({
    labels: [],
    datasets: [],
  });
  const evaluationsServices = new EvaluationService();

  useEffect(() => {
    evaluationsServices.getEvaluationsByGroup(group).then((res) => {
      const labels = getUniq(res.map((itm) => itm.subject_name));
      const data = labels.map((label) => {
        const subData = res.filter(
          (itm) =>
            itm.grade === year - 2020 &&
            itm.semester === semester &&
            itm.subject_name === label
        );
        return (
          subData.reduce((acc, val) => acc + val.value, 0) / subData.length
        );
      });
      setData((_) => ({
        labels,
        datasets: [
          {
            label: "Statistics by Subjects",
            fill: false,
            borderColor: "rgb(255,0 , 0)",
            backgroundColor: "rgb(255, 0, 0)",
            tension: 0.1,
            data,
          },
        ],
      }));
    });
  }, [year, semester, group]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.selects}>
          <Select
            icon={Arrow}
            value={group}
            className={styles.select}
            cover="Խումբ"
            setValue={(val) => setGroup(val)}
            optionClassName={styles.option}
            options={["020", "920"]}
          />
          <Select
            icon={Arrow}
            value={year}
            className={styles.select}
            cover="Տարեթիվ"
            setValue={(val) => setYear(val)}
            optionClassName={styles.option}
            options={[2022, 2023, 2024]}
          />
          <Select
            icon={Arrow}
            value={semester}
            className={styles.select}
            cover="Կիսամյակ"
            setValue={(val) => setSemester(val)}
            optionClassName={styles.option}
            options={[1, 2]}
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
