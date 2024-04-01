import classNames from "classnames";
import { IInputProps } from "./types";

import styles from "./styles.module.scss";

export const Input = ({
  css,
  icon,
  type = "text",
  value,
  className,
  handleChange,
}: IInputProps): JSX.Element => {
  return (
    <div className={styles.continer}>
      <img className={styles.icon} src={icon} />
      <input
        type={type}
        style={css}
        value={value}
        onChange={handleChange}
        className={classNames(styles.input, className)}
      />
    </div>
  );
};
