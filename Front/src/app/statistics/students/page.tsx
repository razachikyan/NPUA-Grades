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

export default function Statistics() {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    datasets: [
      {
        label: "Example Dataset",
        data: [
          65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80,
          81, 56, 55, 40,
        ],
        fill: false,
        borderColor: "rgb(255, 102, 0)",
        backgroundColor: "rgb(255, 102, 0)",
        tension: 0.1,
      },
    ],
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Chart data={data} type="bar" />
      </div>
    </main>
  );
}
