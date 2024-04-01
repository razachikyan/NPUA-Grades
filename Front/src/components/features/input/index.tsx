import classNames from "classnames";
import { Image } from "../image";
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
      {icon && <Image alt="input_icon" src={icon} className={styles.icon} />}
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
