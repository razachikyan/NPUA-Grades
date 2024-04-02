import { Form } from "@/components/features/form";

import styles from "./styles.module.scss";

export default function Signup(): JSX.Element {
  return (
    <div className={styles.continer}>
      <h2 className={styles.title}>Sign up to Subliminator</h2>
      <Form type="signup" />
    </div>
  );
}
