"use client";

import { Input } from "@/components/shared/input";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Button } from "@/components/shared/button";
import { LecturerService } from "@/services/lecturers";

export default function Login() {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const lecturerService = new LecturerService();

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Input
          value={nickname}
          handleChange={setNickname}
          className={styles.input}
          placeholder="NICKNAME"
        />
        <Input
          value={password}
          handleChange={setPassword}
          className={styles.input}
          placeholder="PASSWORD"
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button
          handleClick={async () => {
            const user = await lecturerService.login({
              nickname,
              password,
            });
            if (!user) {
              setError("Wrong nickname or password");
            }
          }}
          className={styles.button}
          text="Log in"
        />
      </form>
    </div>
  );
}
