"use client";

import { useState } from "react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { LecturerService } from "@/services/lecturers";
import { StudentServives } from "@/services/students";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

export default function Login() {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<"student" | "lecturer">("student");
  const [error, setError] = useState("");
  const router = useRouter();

  const lecturerService = new LecturerService();
  const studentService = new StudentServives();

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
            const user =
              mode === "lecturer"
                ? await lecturerService.login({ nickname, password })
                : await studentService.login({ nickname, password });
            if (!user) {
              setError("Wrong nickname or password");
            } else {
              router.push(mode === "lecturer" ? "/lecturer" : "/student");
            }
          }}
          className={styles.button}
          text="Log in"
        />
        <div className={styles.modeContainer}>
          <label className={styles.label}>
            <input
              type="radio"
              value="student"
              checked={mode === "student"}
              onChange={() => setMode("student")}
            />
            Student
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              value="lecturer"
              checked={mode === "lecturer"}
              onChange={() => setMode("lecturer")}
            />
            Lecturer
          </label>
        </div>
      </form>
    </div>
  );
}
