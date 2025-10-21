"use client";

import SignOutButton from "@/components/reuseables/logout/logout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Loading from "../loading";
import { Ring } from "ldrs/react";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);

  if (status == "loading") {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Loading />
        </div>
      </div>
    );
  }

  if (status == "unauthenticated") {
    redirect("/");
  }

  if (session?.user) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="p-3.5 flex flex-row gap-[20px] bg-white rounded-2xl shadow-sm inset-shadow-xs px-[40px]">
          <Label className="text-[#ffffff] py-2 px-4 bg-[#2929298f] rounded-2xl">
            Email
          </Label>{" "}
          <p>{session?.user.email}</p>
        </div>
        <div>
          <SignOutButton>
            <Button
              onClick={() => {
                setLoading(true);
              }}
              className="w-[120px] rounded-3xl flex justify-center items-center h-[40px] cursor-pointer"
            >
              {loading == true ? (
                <Ring size={20} speed={1.5} bgOpacity={0.25} color="white" />
              ) : (
                "Logout Here"
              )}
            </Button>
          </SignOutButton>
        </div>
      </div>
    );
  }
}
