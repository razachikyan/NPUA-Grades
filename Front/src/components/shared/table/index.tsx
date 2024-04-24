"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Pagination } from "./pagination";
import { Cell } from "./cell";
import { ITableProps } from "./types";
import { Button } from "../button";

import styles from "./styles.module.scss";

export const Table = ({
  headers,
  onSubmit,
  editCell,
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
  const [removed, setRemoved] = useState<number>(-1);

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
              <tr
                className={classNames({
                  [styles.active]: changed === i,
                  [styles.delete]: removed === i,
                })}
                key={nanoid()}
              >
                {row.map((item, j) => {
                  return (
                    <Cell
                      ableEdit={
                        ableEdit && (editCell === undefined || editCell == j)
                      }
                      key={nanoid()}
                      value={item}
                      handleRemove={
                        j === 0
                          ? () => {
                              setRemoved(i);
                            }
                          : undefined
                      }
                      setValue={(val) => {
                        setChanged(i);
                        setData((prev) => {
                          prev[i + 7 * currentPage][j] = val;
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
      {data.length > 7 && (
        <Pagination
          current={currentPage}
          onClick={(num) => {
            setRemoved(-1);
            setChanged(-1);
            setCurrentPage(num);
          }}
          size={Math.ceil(data.length / 7)}
        />
      )}
      {onSubmit && (
        <Button
          handleClick={() => {
            changed !== -1 && onSubmit?.("change", changed, data[changed]);
            removed !== -1 && onSubmit?.("remove", removed);
          }}
          className={btnClassname}
        >
          Submit
        </Button>
      )}
    </div>
  );
};
