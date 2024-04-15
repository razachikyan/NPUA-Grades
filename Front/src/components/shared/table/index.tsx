"use client";

import { useEffect, useState } from "react";
import { ITableProps } from "./types";
import { nanoid } from "nanoid";

export const Table = ({
  initialData,
  headers,
  bodyClassName,
  className,
  headClassName,
  handleSort,
}: ITableProps) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData])

  return (
    <table className={className}>
      <thead className={headClassName}>
        <tr>
          {headers.map((header) => {
            return (
              <th
                key={nanoid()}
                onClick={() => {
                  handleSort && setData(handleSort(header));
                }}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={bodyClassName}>
        {data.map((row) => {
          return (
            <tr key={nanoid()}>
              {row.map((item) => {
                return <td key={nanoid()}>{item}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
