export interface ISelectProps {
  value: string | number;
  cover: string;
  options: Array<string | number>;
  className?: string;
  optionClassName?: string;
  setValue: (value: string | number) => void;
  icon?: string;
}
