"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "@/components/shared/button";
import { Input } from "./input";
import { AdminServices } from "@/services/admin";
import { FormValidation } from "@/utils/helpers/validator";
import { IFormData, IFormProps, initialData, INPUT_TYPES } from "./types";
import { LOGIN_ERR, USER_EXIST } from "@/utils/constants/errorsMessages";

import styles from "./styles.module.scss";

export const Form = ({
  type,
  onSubmit,
  submitText,
  disabledSubmit = false,
}: IFormProps): JSX.Element => {
  const [formData, setFormData] = useState<IFormData>(initialData);
  const [errors, setErrors] = useState<IFormData>(initialData);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();
  const reset: boolean = params.get("type") === "reset" && type === "login";
  const validator = new FormValidation();
  const adminServices = new AdminServices();

  const handleSubmit = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    setIsFetching(true);
    switch (type) {
      case "signup": {
        const errors = validator.validateForSignUp(formData).errors;
        if (errors) {
          setErrors(errors);
          break;
        }
        const { confirm, ...data } = formData;
        const user = await adminServices.createUser(data);
        if (user === null) {
          setErrors((prev) => ({
            ...prev,
            email: USER_EXIST,
          }));
          break;
        }
        router.push("/admin");
      }
      case "login": {
        const errors = validator.validateForLogIn({
          email: formData.email,
          password: formData.password,
          isReset: reset,
        }).errors;
        if (errors) {
          setErrors(errors);
          break;
        }
        const user = await adminServices.login(
          formData.email,
          formData.password,
          reset
        );
        if (!user) {
          setErrors((prev) => ({
            ...prev,
            email: LOGIN_ERR,
          }));
          break;
        }
        reset ? router.push("/new-pass") : router.push("/admin");
      }
      case "forgot": {
        const errors = validator.validateForForgot(formData.email).errors;
        if (errors) {
          setErrors((prev) => ({ ...prev, ...errors }));
          break;
        }
        await adminServices.resetPassword(formData.email);
      }
      case "change": {
        const errors = validator.validateForChangePass({
          password: formData.password,
        }).errors;
        if (errors) {
          setErrors((prev) => ({ ...prev, ...errors }));
          break;
        }
        const user = await adminServices.changePass(formData.password);
        user && router.push("/admin");
      }
    }
    onSubmit?.();
    console.log(errors);
    setIsFetching(false);
    // setFormData(initialData);
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
          <Input
            value={formData.middlename}
            handleChange={(middlename) =>
              setFormData((prev) => ({ ...prev, middlename }))
            }
            type={INPUT_TYPES.MIDDLENAME}
            error={errors.middlename}
          />
        </>
      )}
      {type !== "change" && (
        <Input
          value={formData.email}
          handleChange={(email) => setFormData((prev) => ({ ...prev, email }))}
          error={errors.email}
          type={INPUT_TYPES.EMAIL}
        />
      )}
      {type !== "forgot" && (
        <Input
          value={formData.password}
          handleChange={(password) =>
            setFormData((prev) => ({ ...prev, password }))
          }
          type={type === "change" ? INPUT_TYPES.CHANGE : INPUT_TYPES.PASSWORD}
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
        btnType="submit"
        text={submitText}
        className={styles.button}
        disabled={disabledSubmit || isFetching}
        handleClick={handleSubmit}
      >
        {isFetching && (
          <Skeleton baseColor="#1261ff" width={20} height={20} circle />
        )}
      </Button>
      {type === "forgot" ? (
        <Link className={classNames(styles.button, styles.back)} href="/login">
          Back to login
        </Link>
      ) : (
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
      <p className={styles.redirect}>
        Login as{" "}
        <Link href="/login/non-admin" className={styles.link}>
          Lecturer/Student
        </Link>
      </p>
    </form>
  );
};
