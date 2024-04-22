export interface ITableProps {
  className?: string;
  tableClassName?: string;
  initialData: TData;
  headers: Array<string>;
  headClassName?: string;
  bodyClassName?: string;
  btnClassname?: string;
  onSubmit?: (
    type: "remove" | "change",
    index: number,
    data?: string[]
  ) => void;
  handleSort?: (title: string) => TData;
  ableEdit?: boolean;
  editCell?: number;
}

type TData = Array<Array<string>>;
