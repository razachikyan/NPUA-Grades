"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "@/components/shared/button";
import { Select } from "@/components/shared/select";
import { Input } from "./input";
import { UserServices } from "@/services/users";
import { FormValidation } from "@/utils/helpers/validator";
import {
  groupOptions,
  IFormData,
  IFormProps,
  initialData,
  INPUT_TYPES,
  roleOptions,
} from "./types";
import { userRoles } from "@/types/user";

import styles from "./styles.module.scss";

export const Form = ({
  type,
  onSubmit,
  submitText,
  disabledSubmit = false,
}: IFormProps): JSX.Element => {
  const [formData, setFormData] = useState<IFormData>(initialData);
  const [errors, setErrors] = useState<IFormData>(initialData);
  const [role, setRole] = useState<"admin" | "lecturer" | "student">("student");
  const [group, setGroup] = useState<string>("920");

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

    if (errors) {
      return setErrors((prev) => ({ ...prev, ...errors }));
    }
    if (type === "signup") {
      const data = Object.assign(
        { role: userRoles[role] },
        {
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          password: formData.password,
          role: userRoles[role],
        },
        role === "student" ? { group_name: group } : {}
      );
      const user = await userServices.createUser(data);
      user && router.push("/");
      user === null &&
        setErrors((prev) => ({
          ...prev,
          email: "User with this email already exist",
        }));
    } else if (type === "login") {
      const user = await userServices.login(formData.email, formData.password);
      user && router.push("/");
      user === null &&
        setErrors((prev) => ({
          ...prev,
          email: "Wrong email or password",
        }));
    } else if (type === "forgot") {
      // await userServices.resetPassword(formData.email);
    }
    onSubmit?.();
    clearForm();
  };

  return (
    <form className={styles.form}>
      {type === "signup" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className={styles.selectBox}>
            <Select
              className={styles.select}
              optionClassName={styles.option}
              options={roleOptions}
              value={role}
              setValue={setRole as (val: string) => void}
            />
            <span>role</span>
          </div>
          {role === "student" && (
            <div className={styles.selectBox}>
              <Select
                className={styles.select}
                optionClassName={styles.option}
                options={groupOptions}
                value={group}
                setValue={setGroup}
              />
              <span>group</span>
            </div>
          )}
        </div>
      )}
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
        disabled={disabledSubmit}
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
