"use client";

import Link from "next/link";

import styles from "./page.module.scss";

export default function Admin() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link href="/admin/students" className={styles.link}>
          Students
        </Link>
        <Link href="/admin/lecturers" className={styles.link}>
          Lecturers
        </Link>
      </div>
    </div>
  );
}
