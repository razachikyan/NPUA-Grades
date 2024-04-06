export interface IInputProps {
  icon?: string;
  className?: string;
  placeholder?: string;
  value?: number | string;
  css?: React.CSSProperties;
  handleChange?: React.Dispatch<React.SetStateAction<string>>;
  type?: "number" | "text" | "email" | "password";
}
