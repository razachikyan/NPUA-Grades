import { Form } from "@/components/features/form";

import styles from "./styles.module.scss";

export default function Login(): JSX.Element {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Reset your password</h2>
        <p className={styles.descr}>
          We’ll send you an email to reset your password
        </p>
      </div>
      <Form type="signup" />
    </div>
  );
}
