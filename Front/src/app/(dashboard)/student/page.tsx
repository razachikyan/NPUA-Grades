import { Table } from "@/components/shared/table";
import styles from "./styles.module.scss";

export default function Student() {
    const headers = [
      "Achikyan",
      "Achikyan",
      "Achikyan",
      "Achikyan",
      "Achikyan",
      "Achikyan",
      "Achikyan",
      "Achikyan",
    ];
    const data = [
        ["Raz", "Raz", "Raz", "Raz","Raz", "Raz", "Raz", "Raz"],
        ["Raz", "Raz", "Raz", "Raz","Raz", "Raz", "Raz", "Raz"],
        ["Raz", "Raz", "Raz", "Raz","Raz", "Raz", "Raz", "Raz"],
        ["Raz", "Raz", "Raz", "Raz","Raz", "Raz", "Raz", "Raz"],
];
  return <>
    <Table headers={headers} initialData={data} />
  </>;
}
