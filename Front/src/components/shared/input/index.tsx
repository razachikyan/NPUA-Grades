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
  placeholder,
}: IInputProps): JSX.Element => {
  return (
    <div className={classNames(styles.container, className)}>
      {icon && <Image alt="input_icon" src={icon} className={styles.icon} />}
      <input
        type={type}
        style={css}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};
