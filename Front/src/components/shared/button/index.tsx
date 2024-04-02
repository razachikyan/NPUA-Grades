import classNames from "classnames";
import { IButtonProps } from "./types";

import styles from "./styles.module.scss";

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
