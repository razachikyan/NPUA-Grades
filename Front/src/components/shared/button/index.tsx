import { IButtonProps } from "./types";

export const Button = ({
  text,
  css,
  btnType = "button",
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
      type={btnType}
      style={css}
    >
      {text}
      {children}
    </button>
  );
};
