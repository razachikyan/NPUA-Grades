"use client";

import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "@/components/shared/button";
import { Input } from "./input";
import {
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/helpers/validation";
import { IFormData, IFormProps } from "./types";
import { INPUT_TYPES } from "./input/types";

import styles from "./styles.module.scss";

export const Form = ({ type, submitText }: IFormProps): JSX.Element => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const [errors, setErrors] = useState<IFormData>({
    confirm: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const handleSubmit = () => {
    const emailRes = validateEmail(email);
    const firstNameRes = validateName(firstName);
    const lastNameRes = validateName(lastName);
    const passwordRes = validatePassword(password);
    const confirmRes = validateConfirm(password, confirm);

    if (
      emailRes.success &&
      firstNameRes.success &&
      lastNameRes.success &&
      passwordRes.success &&
      confirmRes.success
    ) {
      // post query
    } else {
      setErrors({
        confirm: confirmRes.message ?? "",
        email: emailRes.message ?? "",
        firstname: firstNameRes.message ?? "",
        lastname: lastNameRes.message ?? "",
        password: passwordRes.message ?? "",
      });
    }
  };

  return (
    <form className={styles.form}>
      {type === "signup" && (
        <Input
          type={INPUT_TYPES.FIRSTNAME}
          value={firstName}
          handleChange={setFirstName}
          error={errors.firstname}
        />
      )}
      {type === "signup" && (
        <Input
          value={lastName}
          handleChange={setLastName}
          type={INPUT_TYPES.LASTNAME}
          error={errors.lastname}
        />
      )}
      <Input value={email} handleChange={setEmail} type={INPUT_TYPES.EMAIL} />
      {type !== "forgot" && (
        <Input
          value={password}
          handleChange={setPassword}
          type={INPUT_TYPES.PASSWORD}
          error={errors.password}
        />
      )}
      {type === "signup" && (
        <Input
          value={confirm}
          handleChange={setConfirm}
          type={INPUT_TYPES.CONFIRM}
          error={errors.confirm}
        />
      )}
      <Button
        className={styles.button}
        text={submitText}
        handleClick={handleSubmit}
      />
      {type === "forgot" && (
        <Link className={classNames(styles.button, styles.back)} href="/login">
          Back to login
        </Link>
      )}
      {type !== "forgot" && (
        <p className={styles.redirect}>
          {type === "login" ? (
            <>
              No account yet?{" "}
              <Link className={styles.link} href="/signup">
                Create account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link className={styles.link} href="/login">
                Login
              </Link>
            </>
          )}
        </p>
      )}
    </form>
  );
};
