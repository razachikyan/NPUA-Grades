"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Button } from "@/components/shared/button";
import { AdminServices } from "@/services/admin";
import { LecturerService } from "@/services/lecturers";
import { StudentServives } from "@/services/students";

import styles from "./styles.module.scss";

export default function RootLayout({ children }: PropsWithChildren) {
  const [isLoged, setIsLoged] = useState<boolean>(false);
  const adminServices = new AdminServices();
  const lecturerServices = new LecturerService();
  const studentServices = new StudentServives();

  useEffect(() => {
    const load = async () => {
      const user1 = await adminServices.getUser();
      const user2 = await lecturerServices.getUser();
      const user3 = await studentServices.getUser();

      if (user1 || user2 || user3) {
        setIsLoged(true);
      }
    };

    load();
  }, []);
  return (
    <>
      <header className={styles.header}>
        National Polytechnic University of Armenia
        {isLoged && (
          <Button
            text="Log out"
            className={styles.button}
            handleClick={() => {
              localStorage.removeItem("session_id");
              location.reload();
            }}
          />
        )}
      </header>
      {children}
    </>
  );
}
