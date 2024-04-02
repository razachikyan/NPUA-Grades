export interface IInputProps {
  icon?: string;
  className?: string;
  placeholder?: string;
  value?: number | string;
  css?: React.CSSProperties;
  handleChange?: (ev: React.ChangeEvent) => void;
  type?: "number" | "text" | "email" | "password";
}
