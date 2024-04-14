"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/features/form";
import { UserServices } from "@/services/users";
import { IUser } from "@/types/user";

import styles from "./styles.module.scss";

export default function Login(): JSX.Element {
  const [user, setUser] = useState<IUser | null>(null);
  const [sent, setSent] = useState<boolean>(false);
  const [canSend, setCanSend] = useState<number>(0);
  const router = useRouter();
  const service = new UserServices();

  useEffect(() => {
    service
      .getUser()
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        router.push("/login");
        setUser(null);
      });
  }, []);

  const startCounting = () => {
    const key = setInterval(() => {
      setCanSend((prev) => {
        if (prev === 1) {
          clearInterval(key);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Reset your password</h2>
        <p className={styles.descr}>
          We have sent a link{" "}
          <span className={styles.link}>{sent && `to ${user?.email} `}</span> to
          reset your password.
        </p>
      </div>
      <Form
        type="forgot"
        disabledSubmit={canSend > 0}
        submitText={
          sent
            ? `Send again ${canSend > 0 && `(${canSend} seconds)`}`
            : "Reset password"
        }
        onSubmit={() => {
          setSent(true);
          setCanSend(60);
          startCounting();
        }}
      />
    </div>
  );
}
