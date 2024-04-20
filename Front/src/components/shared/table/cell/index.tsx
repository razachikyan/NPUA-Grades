import { useState } from "react";
import { Input } from "../../input";
import { Image } from "../../image";
import Edit from "@public/icons/edit.svg";
import Save from "@public/icons/save.svg";
import Remove from "@public/icons/remove.svg";
import classNames from "classnames";
import { ICellProps } from "./types";

import styles from "./styles.module.scss";

export const Cell = ({
  setValue,
  value,
  className,
  ableEdit = false,
  handleRemove,
}: ICellProps) => {
  const [inputMode, setInputMode] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState<string>("");

  return (
    <td className={classNames(styles.container, className)}>
      {inputMode ? (
        <Input value={tempValue} handleChange={setTempValue} />
      ) : (
        <div>{value}</div>
      )}
      {ableEdit && (
        <div className={styles.iconBloc}>
          <Image
            src={inputMode ? Save : Edit}
            alt="icon"
            className={styles.icon}
            onClick={() => {
              setInputMode((prev) => !prev && ableEdit);
              if (inputMode) {
                setValue(tempValue);
              } else {
                setTempValue(value);
              }
            }}
          />
        </div>
      )}
      {ableEdit && handleRemove && (
        <div className={styles.removeBloc}>
          <Image
            src={Remove}
            alt="remove"
            className={styles.icon}
            onClick={() => {
              handleRemove?.();
            }}
          />
        </div>
      )}
    </td>
  );
};
