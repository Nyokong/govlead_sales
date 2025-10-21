"use client";

import SignOutButton from "@/components/reuseables/logout/logout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Loading from "../loading";
import { Ring } from "ldrs/react";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);

  if (status == "loading") {
    return (
      <div className="font-sans flex items-center justify-center w-[100dvw] min-h-[60vh] p-8 pb-20 gap-16 sm:p-20">
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
      <div className="font-sans flex flex-col md:flex-row items-center justify-center min-h-[20vh] pb-20 gap-2 sm:p-20 px-10">
        <div className="flex flex-col gap-2 bg-[#ffffff] p-2 rounded-2xl md:w-[400px] md:min-h-[400px]">
          <div className="p-3.5 flex flex-row justify-center items-center gap-[10px] bg-white rounded-2xl shadow-sm inset-shadow-xs px-[20px] sm:px-[40px]">
            <Label className="text-[#ffffff] py-2 px-4 bg-[#2929298f] rounded-2xl">
              Email
            </Label>{" "}
            <p>{session?.user.email}</p>
          </div>
          <Separator />
          <div className="p-3.5 flex flex-row gap-[20px] bg-white rounded-2xl shadow-sm inset-shadow-xs px-[40px]">
            <Label>Some cool thing will be here</Label>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-[#ffffff] p-2 rounded-2xl md:w-[400px] md:min-h-[400px]">
          <div className="p-3.5 flex flex-row gap-[20px] bg-white rounded-2xl shadow-sm inset-shadow-xs px-[40px]">
            Dont press this yet
          </div>
          <Separator />
          <SignOutButton>
            <Button
              onClick={() => {
                setLoading(true);
              }}
              className="w-[100%] rounded-3xl flex justify-center items-center h-[40px] cursor-pointer bg-[#f4f4f4] text-black inset-shadow-xs"
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
