import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header className={styles.header}>
        National Polytechnic University of Armenia
      </header>
      {children}
    </>
  );
}
