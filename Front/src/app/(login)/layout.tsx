import { Image } from "@/components/shared/image";
import Politechnic from "@public/images/polytechnic.png";

import styles from "./styles.module.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.box}>
          <h2 className={styles.title}>NPUA Grades</h2>
          {children}
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src={Politechnic.src}
          className={styles.image}
          alt="polytechnic"
        />
        <h1 className={styles.title2}>
          National Polytechnic University of Armenia
        </h1>
      </div>
    </div>
  );
}
