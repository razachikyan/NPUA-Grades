"use client";
import { Form } from "@/components/features/form";

import styles from "./styles.module.scss";

export default function newPass(): JSX.Element {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Change your password</h2>
      </div>
      <Form type="change" submitText="Change password" />
    </div>
  );
}
