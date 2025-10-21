// import Image from "next/image";
"use client";

import Header from "@/components/reuseables/header";
import { SignIn } from "@/components/reuseables/login/login";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Loading from "./loading";

export default function Home() {
  const { status } = useSession();

  if (status == "authenticated") {
    redirect("/dashboard");
  }

  if (status == "loading") {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[100vh] p-8 pb-20 gap-16 sm:p-20 bg-amber-300">
        <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-[100vh] p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SignIn />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Some Footer
      </footer>
    </div>
  );
}
