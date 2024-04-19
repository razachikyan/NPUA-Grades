"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { UserServices } from "@/services/users";
import { IUser } from "@/types/user";

import styles from "./styles.module.scss";

export default function Admin({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const userServices = new UserServices();

  useEffect(() => {
    const load = async () => {
      const user = await userServices.getUser();
      if (!user || user.session_id !== localStorage.getItem("session_id"))
        router.push("/login");
      setUser(user);
    };

    load();
  }, []);

  return (
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
  );
}
