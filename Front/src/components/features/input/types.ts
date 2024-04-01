export interface IInputProps {
  className?: string;
  css?: React.CSSProperties;
  icon?: string;
  value?: number | string;
  handleChange?: (ev: React.ChangeEvent) => void;
  type?: "number" | "text" | "email" | "password";
}
