export interface IInputProps {
  icon?: string | null;
  type?: TInputTypes;
  className?: string;
  placeholder?: string;
  value?: number | string;
  css?: React.CSSProperties;
  required?: boolean;
  onIconClick?: () => void;
  handleChange?: (value: string) => void;
}

export type TInputTypes = "number" | "text" | "email" | "password";