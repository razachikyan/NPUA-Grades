"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Pagination } from "./pagination";
import { Cell } from "./cell";
import { ITableProps } from "./types";

import { Button } from "../button";

export const Table = ({
  headers,
  onSubmit,
  className,
  handleSort,
  initialData,
  btnClassname,
  bodyClassName,
  headClassName,
  tableClassName,
  ableEdit = false,
}: ITableProps) => {
  const [data, setData] = useState(initialData);
  const [tempData, setTempData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [changed, setChanged] = useState<number>(-1);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setTempData(data.slice(7 * currentPage, 7 * (currentPage + 1)));
  }, [data, currentPage]);

  return (
    <div className={className}>
      <table className={tableClassName}>
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
          {tempData.map((row, i) => {
            return (
              <tr key={nanoid()}>
                {row.map((item, j) => {
                  return (
                    <Cell
                      ableEdit={ableEdit}
                      key={nanoid()}
                      value={item}
                      setValue={(val) => {
                        setChanged(i);
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
        {data.length > 7 && (
          <Pagination
            current={currentPage}
            onClick={(num) => {
              setCurrentPage(num);
            }}
            size={Math.ceil(data.length / 7)}
          />
        )}
      </table>
      <Button
        handleClick={() => {
          onSubmit?.(data[changed], changed);
        }}
        className={btnClassname}
      >
        Submit
      </Button>
    </div>
  );
};
