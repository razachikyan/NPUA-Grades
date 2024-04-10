"use client";

import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "@/components/shared/button";
import { Input } from "./input";
import { UserServices } from "@/services/users";
import { FormValidation } from "@/utils/helpers/validator";
import { IFormData, IFormProps, INPUT_TYPES } from "./types";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

export const Form = ({ type, submitText }: IFormProps): JSX.Element => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
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

  const router = useRouter();
  const validator = new FormValidation();
  const userServices = new UserServices();

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setConfirm("");
  }

  const handleSubmit = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (type === "signup") {
      const data = { email, firstname, lastname, password };
      const { errors } = validator.validateForSignUp({
        confirm,
        ...data,
      });
      if (errors) {
        setErrors(errors);
      } else {
        const user = await userServices.createUser(data);
        user && router.push("/");
        clearForm()
      }
    } else if (type === "login") {
      const { errors } = validator.validateForLogIn({
        email,
        password,
      });
      if (errors) {
        setErrors((prev) => ({ ...prev, ...errors }));
      } else {
        const user = await userServices.login(email, password);
        user && router.push("/");
        clearForm()
      }
    } else if (type === "forgot") {
      const { errors } = validator.validateForForgot(email);
      if (errors) setErrors((prev) => ({ ...prev, ...errors }));
      else await userServices.resetPassword(email);
    }
  };

  return (
    <form className={styles.form}>
      {type === "signup" && (
        <Input
          type={INPUT_TYPES.FIRSTNAME}
          value={firstname}
          handleChange={setFirstName}
          error={errors.firstname}
        />
      )}
      {type === "signup" && (
        <Input
          value={lastname}
          handleChange={setLastName}
          type={INPUT_TYPES.LASTNAME}
          error={errors.lastname}
        />
      )}
      <Input
        value={email}
        handleChange={setEmail}
        error={errors.email}
        type={INPUT_TYPES.EMAIL}
      />
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
