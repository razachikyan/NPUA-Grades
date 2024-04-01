import classNames from "classnames";
import styles from "./styles.module.scss";
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
      className={classNames(styles.button, className)}
      style={css}
    >
      {text}
      {children}
    </button>
  );
};
