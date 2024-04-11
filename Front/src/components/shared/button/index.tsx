import { IButtonProps } from "./types";

export const Button = ({
  text,
  css,
  children,
  className,
  handleClick,
}: IButtonProps): JSX.Element => {
  return (
    <button
      onClick={handleClick}
      className={className}
      style={css}
    >
      {text}
      {children}
    </button>
  );
};
