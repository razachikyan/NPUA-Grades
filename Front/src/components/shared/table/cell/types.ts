export interface ICellProps {
  className?: string;
  value: string;
  setValue: (value: string) => void;
  ableEdit?: boolean;
  handleRemove?: () => void;
}
