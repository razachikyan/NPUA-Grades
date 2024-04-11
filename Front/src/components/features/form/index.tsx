"use client";

import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "@/components/shared/button";
import { Input } from "./input";
import { UserServices } from "@/services/users";
import { FormValidation } from "@/utils/helpers/validator";
import { IFormData, IFormProps, initialData, INPUT_TYPES } from "./types";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

export const Form = ({ type, submitText }: IFormProps): JSX.Element => {
  const [formData, setFormData] = useState<IFormData>(initialData);
  const [errors, setErrors] = useState<IFormData>(initialData);

  const router = useRouter();
  const validator = new FormValidation();
  const userServices = new UserServices();

  const clearForm = () => setFormData(initialData);

  const handleSubmit = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    let errors: Partial<IFormData> | null = null;

    if (type === "signup")
      errors = validator.validateForSignUp(formData).errors;
    else if (type === "login") {
      errors = validator.validateForLogIn({
        email: formData.email,
        password: formData.password,
      }).errors;
    } else if (type === "forgot")
      errors = validator.validateForForgot(formData.email).errors;

    if (errors) return setErrors((prev) => ({ ...prev, ...errors }));
    if (type === "signup") {
      const user = await userServices.createUser(formData);
      user && router.push("/");
    } else if (type === "login") {
      const user = await userServices.login(formData.email, formData.password);
      user && router.push("/");
    } else if (type === "forgot") {
      await userServices.resetPassword(formData.email);
    }
    clearForm();
  };

  return (
    <form className={styles.form}>
      {type === "signup" && (
        <>
          <Input
            type={INPUT_TYPES.FIRSTNAME}
            value={formData.firstname}
            handleChange={(firstname) =>
              setFormData((prev) => ({ ...prev, firstname }))
            }
            error={errors.firstname}
          />
          <Input
            value={formData.lastname}
            handleChange={(lastname) =>
              setFormData((prev) => ({ ...prev, lastname }))
            }
            type={INPUT_TYPES.LASTNAME}
            error={errors.lastname}
          />
        </>
      )}
      <Input
        value={formData.email}
        handleChange={(email) => setFormData((prev) => ({ ...prev, email }))}
        error={errors.email}
        type={INPUT_TYPES.EMAIL}
      />
      {type !== "forgot" && (
        <Input
          value={formData.password}
          handleChange={(password) =>
            setFormData((prev) => ({ ...prev, password }))
          }
          type={INPUT_TYPES.PASSWORD}
          error={errors.password}
        />
      )}
      {type === "signup" && (
        <Input
          value={formData.confirm}
          handleChange={(confirm) =>
            setFormData((prev) => ({ ...prev, confirm }))
          }
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
