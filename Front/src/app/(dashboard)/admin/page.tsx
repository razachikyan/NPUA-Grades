"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "@/components/shared/table";
import { Select } from "@/components/shared/select";
import Arrow from "@public/icons/arrow.svg";
import { UserServices } from "@/services/users";
import { IUser } from "@/types/user";

import styles from "./styles.module.scss";

export default function Admin() {
  const [user, setUser] = useState<IUser | null>(null);
  const [selectValue, setSelectValue] = useState<string>("Test 1");
  const router = useRouter();

  const userServices = new UserServices();
  const headers = [
    "Առարկա",
    "Դասահաճախում",
    "Միջ․ 1",
    "Միջ․ 2",
    "Ամփ․ քն․",
    "Կիս․ առ․ռեյտինգ",
    "Կիս․ ՄՈԳ",
    "Արդ․ ՄՈԳ",
  ];
  const data = [
    ["data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2"],
    ["data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2"],
    ["data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2"],
    ["data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2", "data 2"],
  ];

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
          {user.firstname} {user.lastname}
        </span>
      )}
      <div className={styles.selects}>
        {[1, 2, 3, 4, 5].map(() => (
          <Select
            icon={Arrow}
            value={selectValue}
            className={styles.select}
            setValue={setSelectValue}
            optionClassName={styles.option}
            options={["test 2", "test 3", "test 4", "test 5", "test 6"]}
          />
        ))}
      </div>
      <Table
        bodyClassName={styles.body}
        headClassName={styles.head}
        className={styles.table}
        headers={headers}
        initialData={data}
      />
    </div>
  );
}
