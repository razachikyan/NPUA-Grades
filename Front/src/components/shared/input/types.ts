export interface IInputProps {
  icon?: string | null;
  type?: TInputTypes;
  className?: string;
  placeholder?: string;
  value?: number | string;
  css?: React.CSSProperties;
  onIconClick?: () => void;
  handleChange?: React.Dispatch<React.SetStateAction<string>>;
}

export type TInputTypes = "number" | "text" | "email" | "password";