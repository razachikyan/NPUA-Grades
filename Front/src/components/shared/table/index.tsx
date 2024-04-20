"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Pagination } from "./pagination";
import { Cell } from "./cell";
import { ITableProps } from "./types";

export const Table = ({
  initialData,
  headers,
  bodyClassName,
  className,
  headClassName,
  handleSort,
}: ITableProps) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setData(initialData.slice(7 * currentPage, 7 * (currentPage + 1)));
  }, [initialData, currentPage]);

  return (
    <div>
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
                      key={nanoid()}
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
        {initialData.length > 7 && (
          <Pagination
            current={currentPage}
            onClick={(num) => {
              setCurrentPage(num);
            }}
            size={Math.ceil(initialData.length / 7)}
          />
        )}
      </table>
    </div>
  );
};
