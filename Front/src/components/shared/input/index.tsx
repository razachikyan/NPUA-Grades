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
  placeholder,
  onIconClick,
  handleChange,
}: IInputProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {icon && (
        <Image
          alt="input_icon"
          src={icon}
          onClick={(ev) => {
            ev.stopPropagation();
            onIconClick?.()
          }}
          className={styles.icon}
        />
      )}
      <input
        type={type}
        style={css}
        value={value}
        onChange={(ev) => handleChange?.(ev.target.value)}
        placeholder={placeholder}
        className={classNames(styles.input, className)}
      />
    </div>
  );
};
