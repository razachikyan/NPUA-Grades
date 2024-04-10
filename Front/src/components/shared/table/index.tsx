"use client"

import { useState } from "react";
import { ITableProps } from "./types";

export const Table = ({
  initialData,
  headers,
  bodyClassName,
  className,
  headClassName,
  handleSort
}: ITableProps) => {
  const [data, setData] = useState(initialData);

  return (
    <table className={className}>
      <thead className={headClassName}>
        <tr>
          {headers.map((header) => {
            return <th onClick={() => {
              handleSort && setData(handleSort(header))
            }}>{header}</th>;
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
