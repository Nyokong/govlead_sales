"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Loading from "../loading";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
// import { ThemeContext } from "@/context/themeContext";
import Header from "@/components/reuseables/header";
import { motion } from "motion/react";
import { IconMailFilled } from "@tabler/icons-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  // const { currentTheme } = useContext(ThemeContext);

  // const [generate, setGenerate] = useState(false);

  if (status == "loading") {
    return (
      <div className="font-sans flex items-center justify-center w-[100dvw] min-h-[70vh] p-8 pb-20 gap-16 sm:p-20">
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
      <div className="">
        <Header />
        <div
          className={`font-sans grid grid-cols-1 md:grid-cols-2 place-items-center py-[30px] items-center justify-center min-h-[20vh] pb-20 gap-2 sm:p-20 px-10 `}
        >
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 bg-[#ffffff] dark:bg-[#5c5c5c]  w-[340px] p-2 rounded-2xl md:min-h-[400px]"
          >
            <div className="p-3.5 flex flex-row justify-start items-center gap-[10px] bg-white dark:bg-[#505050] rounded-2xl shadow-sm inset-shadow-xs px-[20px] sm:px-[40px]">
              <Label className="text-3xl ">Profile</Label>
            </div>
            <div className="p-3.5 flex flex-row justify-center items-center gap-[10px] bg-white dark:bg-[#505050] rounded-2xl shadow-sm inset-shadow-xs px-[20px] sm:px-[40px]">
              <Label className="text-[#ffffff] py-2 px-4 bg-[#2929298f] rounded-2xl">
                <IconMailFilled />
                Email
              </Label>{" "}
              <p className=" text-black dark:text-white">
                {session?.user.email}
              </p>
            </div>
            <Separator />
            <div className="p-3.5 flex flex-row gap-[20px] bg-white dark:bg-[#505050] rounded-2xl shadow-sm inset-shadow-xs px-[40px]">
              <Label className=" text-black dark:text-white">settings</Label>
            </div>
          </motion.div>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 bg-[#ffffff] dark:bg-[#5c5c5c] p-2 rounded-2xl lg:w-[400px] w-[340px] md:min-h-[400px]"
          >
            <div className="p-3.5 flex flex-row justify-start items-center gap-[10px] bg-white dark:bg-[#505050] rounded-2xl shadow-sm inset-shadow-xs px-[20px] sm:px-[40px]">
              <Label className="text-3xl ">Menu</Label>
            </div>

            <Separator />
            <div className="p-3.5 flex flex-col gap-[30px] bg-white dark:bg-[#505050] rounded-2xl shadow-sm inset-shadow-xs px-[40px]">
              <Label>Generate Invoice</Label>
              <Label>Edit Invoice</Label>
              <Label>Check Previous Invoices</Label>

              <Separator />
              <Label className="justify-self-end mb-[20px]">Contacts</Label>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
}
