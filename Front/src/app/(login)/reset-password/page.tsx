import { Form } from "@/components/features/form";

import styles from "./styles.module.scss";

export default function Login(): JSX.Element {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Reset your password</h2>
        <p className={styles.descr}>
          We have sent a link to{" "}
          <span className={styles.link}>example@gmail.com</span> to reset your
          password.
        </p>
      </div>
      <Form type="forgot" submitText="Reset password" />
    </div>
  );
}
