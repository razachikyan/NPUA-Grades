import { IButtonProps } from "./types";

export const Button = ({
  text,
  css,
  children,
  className,
  handleClick,
  disabled = false,
}: IButtonProps): JSX.Element => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={className}
      style={css}
    >
      {text}
      {children}
    </button>
  );
};
