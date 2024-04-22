"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import { AdminServices } from "@/services/admin";
import { LecturerService } from "@/services/lecturers";
import { StudentServives } from "@/services/students";

import styles from "./styles.module.scss";

export default function Homepage() {
  const adminServices = new AdminServices();
  const lecturerServices = new LecturerService();
  const studentServices = new StudentServives();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const user1 = await adminServices.getUser();
      const user2 = await lecturerServices.getUser();
      const user3 = await studentServices.getUser();

      if (user1) router.push("/admin");
      else if (user2) router.push("/lecturer");
      else if (user3) router.push("/student");
      else router.push("/login");
    };

    load();
  }, []);

  return (
    <main className={styles.main}>
      <ClockLoader size={200} color="#fff" speedMultiplier={3} />
    </main>
  );
}
