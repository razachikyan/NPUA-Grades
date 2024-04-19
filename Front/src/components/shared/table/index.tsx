"use client";

import { useEffect, useState } from "react";
import { ITableProps } from "./types";
import { nanoid } from "nanoid";
import { Cell } from "./cell";

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
  }, [initialData]);

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
        {data.map((row, i) => {
          return (
            <tr key={nanoid()}>
              {row.map((item, j) => {
                return (
                  <Cell
                    value={item}
                    setValue={(val) => {
                      setData((prev) => {
                        prev[i][j] = val;
                        return prev;
                      });
                    }}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
