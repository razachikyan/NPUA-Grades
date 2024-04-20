export interface IButtonProps extends React.PropsWithChildren {
  text?: string;
  className?: string;
  css?: React.CSSProperties;
  disabled?: boolean;
  btnType?: "submit" | "button";
  handleClick?: (ev: React.MouseEvent) => void;
}
