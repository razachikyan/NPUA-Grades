export interface ISelectProps {
  value: string | number;
  cover: string;
  options: Array<string | number>;
  className?: string;
  optionClassName?: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  icon?: string;
}
