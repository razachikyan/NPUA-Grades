"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/shared/select";
import { UserServices } from "@/services/users";
import { IUser, TGroups } from "@/types/user";

import styles from "./styles.module.scss";

export default function Admin({children}:PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [group, setGroup] = useState<TGroups>("020");
  const [semester, setSemester] = useState<number>(2);
  const router = useRouter();

  const userServices = new UserServices();

  useEffect(() => {
    const load = async () => {
      const user = await userServices.getUser();
      if (!user) router.push("/login");
      setUser(user);
    };

    load();
  }, []);

  return (
    <div className={styles.container}>
      {user && (
        <span className={styles.username}>
          {user.firstname} {user.lastname} {user.middlename}
        </span>
      )}
      {children}
      <div className={styles.selects}>
        <Select
          value={year}
          cover={"Տարեթիվ"}
          options={[2022, 2023, 2024]}
          setValue={setYear}
          className={styles.select}
          optionClassName={styles.option}
        />
        <Select
          value={group}
          cover={"Խումբ"}
          options={["020", "920"]}
          setValue={setGroup}
          className={styles.select}
          optionClassName={styles.option}
        />
        <Select
          value={semester}
          cover={"Կիսամյակ"}
          options={[1, 2]}
          setValue={setSemester}
          className={styles.select}
          optionClassName={styles.option}
        />
      </div>
    </div>
  );
}
