import React from "react";

export interface ITableProps {
  className?: string;
  initialData: TData;
  headers: Array<string>;
  headClassName?: string;
  bodyClassName?: string;
  handleSort?: (title: string) => TData;
}

type TData = Array<Array<string>>;
