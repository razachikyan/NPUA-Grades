"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import {
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/helpers/validation";
import { IFormData, IFormProps } from "./types";

import classNames from "classnames";

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

  return (
    <form className={styles.form}>
      {type === "signup" && (
        <div>
          <Input
            value={firstName}
            handleChange={setFirstName}
            className={styles.input}
            placeholder="Enter your first name"
          />
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
      )}
      {type === "signup" && (
        <div>
          <Input
            value={lastName}
            handleChange={setLastName}
            className={styles.input}
            placeholder="Enter your last name"
          />
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>
      )}
      <div>
        <Input
          value={email}
          handleChange={setEmail}
          className={styles.input}
          placeholder="Enter your email"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      {type !== "forgot" && (
        <div>
          <Input
            value={password}
            handleChange={setPassword}
            className={styles.input}
            placeholder="Create a password"
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
      )}
      {type === "signup" && (
        <div>
          <Input
            value={confirm}
            handleChange={setConfirm}
            className={styles.input}
            placeholder="Confirm the password"
          />
          {errors.confirm && <p>{errors.confirm}</p>}
        </div>
      )}
      <Button
        className={styles.button}
        text={submitText}
        handleClick={() => {
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
        }}
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
