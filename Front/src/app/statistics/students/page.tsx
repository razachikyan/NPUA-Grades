"use client";

import { useEffect, useState } from "react";
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
import { Select } from "@/components/shared/select";
import Arrow from "@public/icons/arrow.svg";
import { TGroups } from "@/types/user";

import styles from "./styles.module.scss";
import { EvaluationService } from "@/services/evaluations";
import { getUniq } from "@/utils/helpers/getUniq";
import { getMog } from "@/utils/helpers/getMog";

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
  const [semester, setSemester] = useState<number>(1);
  const [group, setGroup] = useState<TGroups>("920");
  const [year, setYear] = useState<number>(2024);
  const [data, setData] = useState<
    ChartData<"bar", (number | [number, number] | null)[], unknown>
  >({
    labels: [],
    datasets: [
      {
        label: "Ուսանողների Վիճակագրություն",
        data: [],
        backgroundColor: "rgb(0, 170, 90)",
      },
    ],
  });
  const evaluationService = new EvaluationService();

  useEffect(() => {
    evaluationService
      .getEvaluations(group, year - 2020, semester)
      .then((res) => {
        const students = getUniq(res.map((item) => item.student_id));
        const mogs = students.map((std) => {
          const stdEvals = res.filter((evl) => evl.student_id === std);
          const mog = getMog(std, stdEvals);
          return mog;
        });
        const labels = students
          .map((std) => res.find((item) => item.student_id === std))
          .map(
            (item) => `${item?.firstname} ${item?.lastname} ${item?.middlename}`
          );

        setData((prev) => ({
          ...prev,
          labels,
          datasets: [
            {
              ...prev.datasets[0],
              data: mogs,
            },
          ],
        }));
      });
  }, [group, year, semester]);

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
          data={data}
          type="bar"
          options={{
            scales: {
              y: {
                min: 0,
                max: 100,
              },
            },
          }}
        />
      </div>
    </main>
  );
}
