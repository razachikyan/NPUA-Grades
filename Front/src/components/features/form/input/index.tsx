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
  const [icon, setIcon] = useState<string | null>(null);

  useEffect(() => {
    setInputType(() => {
      const isPass = [INPUT_TYPES.PASSWORD, INPUT_TYPES.CONFIRM].includes(type);
      const isEmail = type === INPUT_TYPES.EMAIL;
      return isPass ? "password" : isEmail ? "email" : "text";
    });
  }, [type]);

  useEffect(() => {
    setIcon((prev) => {
      const isPass = [INPUT_TYPES.PASSWORD, INPUT_TYPES.CONFIRM].includes(type);
      if (!isPass) return null;
      return prev === Hide ? Show : Hide;
    });
  }, [inputType]);

  return (
    <div className={styles.container}>
      <h5 className={styles.topic}>{inputData[type].topic}</h5>
      <CustomInput
        value={value}
        handleChange={handleChange}
        className={styles.input}
        placeholder={inputData[type].placeholder}
        type={inputType}
        icon={icon}
        onIconClick={() =>
          setInputType((prev) => (prev === "text" ? "password" : "text"))
        }
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
