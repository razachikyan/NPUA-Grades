"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { IFormProps } from "./types";

import styles from "./styles.module.scss";
import classNames from "classnames";

export const Form = ({ type, submitText }: IFormProps): JSX.Element => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  return (
    <form className={styles.form}>
      {type === "signup" && (
        <Input
          value={firstName}
          handleChange={setFirstName}
          className={styles.input}
          placeholder="Enter your first name"
        />
      )}
      {type === "signup" && (
        <Input
          value={lastName}
          handleChange={setLastName}
          className={styles.input}
          placeholder="Enter your last name"
        />
      )}
      <Input
        value={email}
        handleChange={setEmail}
        className={styles.input}
        placeholder="Enter your email"
      />
      {type !== "forgot" && (
        <Input
          value={password}
          handleChange={setPassword}
          className={styles.input}
          placeholder="Create a password"
        />
      )}
      {type === "signup" && (
        <Input
          value={confirm}
          handleChange={setConfirm}
          className={styles.input}
          placeholder="Confirm the password"
        />
      )}
      <Button className={styles.button} text={submitText} />
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
