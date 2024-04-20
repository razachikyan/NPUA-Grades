"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import { AdminServices } from "@/services/admin";

import styles from "./styles.module.scss";

export default function Homepage() {
  const adminServices = new AdminServices();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const user = await adminServices.getUser();
      user && router.push("/admin");
      if (!user) router.push("/login");
    };

    load();
  }, []);

  return (
    <main className={styles.main}>
      <ClockLoader size={200} color="#fff" speedMultiplier={3} />
    </main>
  );
}
