import { Form } from "@/components/features/form";

import styles from "./styles.module.scss";

export default function Login(): JSX.Element {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Welcome back!</h2>
        <p className={styles.descr}>
          Enter your credentials to access your account
        </p>
      </div>
      <Form type="login" submitText="Login" />
    </div>
  );
}
