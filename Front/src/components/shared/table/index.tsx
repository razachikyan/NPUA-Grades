import { useState } from "react";
import { ITableProps } from "./types";

export const Table = ({
  initialData,
  headers,
  bodyClassName,
  className,
  headClassName,
}: ITableProps) => {
  const [data, setData] = useState(initialData);

  const sortData = (topic: string) => {
    const colIndex = headers.indexOf(topic)
    if(colIndex < 0) return
    const newData = data.sort()
    setData(newData)
  }

  return (
    <table className={className}>
      <thead className={headClassName}>
        <tr>
          {headers.map((header) => {
            return <th>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody className={bodyClassName}>
        {data.map((row) => {
          return (
            <tr>
              {row.map((item) => {
                return <td>{item}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
