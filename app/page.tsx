// import Image from "next/image";
"use client";

import { SignIn } from "@/components/reuseables/login/login";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Loading from "./loading";
import Header from "@/components/reuseables/header";

export default function Home() {
  const { status } = useSession();

  if (status == "authenticated") {
    redirect("/dashboard");
  }

  // if (status == "loading") {
  //   return (
  //     <div className="font-sans absolute z-10 flex items-center justify-center h-[60vh] w-screen p-8 pb-20 gap-16 sm:p-20">
  //       <div className="flex  items-center sm:items-start p-[30px] rounded-4xl bg-white inset-shadow-sm inset-shadow-black-200 shadow-sm">
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Header />
      <div className="font-sans flex flex-col justify-center items-center h-[80vh]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <SignIn />
        </main>
        {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Some Footer
      </footer> */}
      </div>
    </div>
  );
}
