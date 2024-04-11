export interface ISelectProps {
  value: string;
  options: string[];
  className?: string;
  optionClassName?: string;
  setValue: (value: string) => void;
  icon?: string;
}
