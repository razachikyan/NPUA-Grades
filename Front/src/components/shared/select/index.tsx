import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import classNames from "classnames";
import { Image } from "../image";
import { ISelectProps } from "./types";

import styles from "./styles.module.scss";

export const Select = ({
  options,
  optionClassName,
  className,
  value,
  icon,
  cover,
  setValue,
}: ISelectProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHeight((prev) => (ref.current ? ref.current.clientHeight : prev));
  }, []);

  return (
    <div style={{height}} className={styles.container}>
      <div
        ref={ref}
        onClick={() => setOpen((prev) => !prev)}
        className={classNames(styles.select, className)}
      >
        {cover}
        {icon && (
          <Image
            src={icon}
            alt="open-close"
            className={styles.icon}
            style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
          />
        )}
      </div>
      {open && (
        <div style={{ top: height }} className={styles.options}>
          {options.map((option) => {
            return (
              <div
              onClick={() => {
                  setOpen(false);
                  setValue(option);
                }}
                key={nanoid()}
                className={classNames(styles.option, optionClassName)}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
