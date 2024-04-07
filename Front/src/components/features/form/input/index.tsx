"use client";

import { useEffect, useState } from "react";
import { Input as CustomInput } from "@/components/shared/input";
import Hide from "@public/icons/hide-password.svg";
import Show from "@public/icons/show-password.svg";
import { TInputTypes } from "@/components/shared/input/types";
import { IInputProps, inputData } from "./types";
import { INPUT_TYPES } from "../types";

import styles from "./styles.module.scss";

export const Input = ({
  type,
  error,
  value,
  handleChange,
}: IInputProps): JSX.Element => {
  const [inputType, setInputType] = useState<TInputTypes>("text");
  const [icon, setIcon] = useState<string>(Hide);
  const isPassType =
    type === INPUT_TYPES.PASSWORD || type === INPUT_TYPES.CONFIRM;
  useEffect(() => {
    setInputType(() => {
      if (isPassType) return INPUT_TYPES.PASSWORD;
      if (type === INPUT_TYPES.EMAIL) return INPUT_TYPES.EMAIL;
      return "text";
    });
  }, [type, isPassType]);

  useEffect(() => {
    setInputType(() => {
      return icon === Hide ? INPUT_TYPES.PASSWORD : "text";
    });
  }, [icon]);

  return (
    <div className={styles.container}>
      <h5 className={styles.topic}>{inputData[type].topic}</h5>
      <CustomInput
        value={value}
        handleChange={handleChange}
        className={styles.input}
        placeholder={inputData[type].placeholder}
        type={inputType}
        icon={isPassType ? icon : undefined}
        onIconClick={() =>
          setIcon((prev) => {
            return prev === Hide ? Show : Hide;
          })
        }
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
