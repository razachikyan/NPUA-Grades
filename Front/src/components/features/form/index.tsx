import { IFormProps } from "./types";

import styles from "./styles.module.scss";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import Link from "next/link";

export const Form = ({ type }: IFormProps): JSX.Element => {
  console.log(type);

  return (
    <form className={styles.form}>
      <Input className={styles.input} placeholder="Enter your first name" />
      <Input className={styles.input} placeholder="Enter your last name" />
      <Input className={styles.input} placeholder="Create a password" />
      <Input className={styles.input} placeholder="Confirm the password" />
      <Button text="Create an account" />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
};
