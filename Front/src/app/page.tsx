"use client";

import { UserServices } from "@/services/users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Homepage() {
  const userServices = new UserServices()
  const router = useRouter()
  const pages = ['student', 'lecturer', "admin"]

  useEffect(() => {
    const load = async () => {
      const user = await userServices.getUser()
      user &&  router.push(pages[user?.role]);
      if(!user) router.push('/login')
    }

    load()
  }, [])

  return <main>Hello</main>;
}
