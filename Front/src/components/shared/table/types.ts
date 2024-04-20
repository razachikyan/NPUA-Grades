export interface ITableProps {
  className?: string;
  tableClassName?: string;
  initialData: TData;
  headers: Array<string>;
  headClassName?: string;
  bodyClassName?: string;
  btnClassname?: string;
  onSubmit?: (data: string[], inded: number) => void;
  handleSort?: (title: string) => TData;
  ableEdit?: boolean;
}

type TData = Array<Array<string>>;
