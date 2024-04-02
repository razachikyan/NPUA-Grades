export interface IButtonProps extends React.PropsWithChildren {
  text?: string;
  className?: string;
  css?: React.CSSProperties;
  handleClick?: (ev: React.MouseEvent) => void;
}
