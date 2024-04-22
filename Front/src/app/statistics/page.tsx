import Link from "next/link";
import { Image } from "@/components/shared/image";
import Student from "@public/icons/student.svg"
import Lecturer from "@public/icons/lecturer.svg"

import styles from "./page.module.scss"

export default function Statistics() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.block}>
          <Link href="/statistics/students" className={styles.link}>
            <Image className={styles.image} src={Student} alt="student"/>
            <span className={styles.text}>Student statistics</span>
          </Link>
          <Link href="/statistics/lecturers" className={styles.link}>
            <Image className={styles.image} src={Lecturer} alt="lecturer" />
            <span className={styles.text}>Lecturer statistics</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
