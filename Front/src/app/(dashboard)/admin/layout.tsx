"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { AdminServices } from "@/services/admin";
import { IUser } from "@/types/user";

import styles from "./styles.module.scss";

export default function Admin({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const adminServices = new AdminServices();

  useEffect(() => {
    const load = async () => {
      const user = await adminServices.getUser();
      if (!user || user.session_id !== localStorage.getItem("session_id"))
        router.push("/login");
      setUser(user);
    };

    load();
  }, []);

  return (
    <>
      <main className={styles.admin}>
        <div className={styles.container}>
          {user ? (
            <span className={styles.username}>
              {user.firstname} {user.lastname} {user.middlename}
            </span>
          ) : (
            <div className={styles.username}>
              <Skeleton baseColor="#002c83" borderRadius={0} />
            </div>
          )}
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <nav className={styles.nav}>
          <Link className={styles.link} href="/admin">
            Admin page
          </Link>
          <Link className={styles.link} href="/admin/students">
            Students list
          </Link>
          <Link className={styles.link} href="/admin/lecturers">
            Lecturers list
          </Link>
          <Link className={styles.link} href="/statistics/students">
            Students Statistics
          </Link>
          <Link className={styles.link} href="/statistics/lecturers">
            Lecturers Statistics
          </Link>
        </nav>
      </footer>
    </>
  );
}
