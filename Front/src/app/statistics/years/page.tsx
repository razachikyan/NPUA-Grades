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
  const [data, setData] = useState<
    ChartData<"bar", (number | [number, number] | null)[], unknown>
  >({
    labels: [],
    datasets: [],
  });
  const evaluationsServices = new EvaluationService();

  useEffect(() => {
    evaluationsServices.getEvaluationsByGroup(group).then((res) => {
      const labels = ["2021-2022", "2022-2023", "2023-2024"];
      const data_2 = res.filter((item) => item.grade === 2);
      const data_3 = res.filter((item) => item.grade === 3);
      const data_4 = res.filter((item) => item.grade === 4);
      const val1 =
        data_2.reduce((acc, itm) => acc + itm.value, 0) / data_2.length;
      const val2 =
        data_3.reduce((acc, itm) => acc + itm.value, 0) / data_3.length;
      const val3 =
        data_4.reduce((acc, itm) => acc + itm.value, 0) / data_4.length;
      setData((_) => ({
        labels,
        datasets: [
          {
            label: "Statistics by years",
            fill: false,
            borderColor: "rgb(255,0 , 0)",
            backgroundColor: "rgb(255, 0, 0)",
            tension: 0.1,
            data: [val1, val2, val3],
          },
        ],
      }));
    });
  }, []);

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
