import React, { useContext } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import { Input } from "@/components/ui/input";

import { ThemeContext } from "@/context/themeContext";
import Template from "../invoice/template";
import { Separator } from "@/components/ui/separator";

export default function Clientdetails() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <form
        action=""
        className="px-[20px] w-[370px] h-auto flex flex-col gap-4 p-[20px]"
      >
        {/* <div className="flex justify-center items-center h-[80px] w-auto  object-cover">
          {currentTheme == "dark" ? (
            <Image
              src={"/parent_logoWTrans.png"}
              width={180}
              height={180}
              className="object-fill "
              alt="parent_logo_image"
            />
          ) : (
            <Image
              src={"/parent_logo.png"}
              width={180}
              height={180}
              className="object-fill "
              alt="parent_logo_image"
            />
          )}
        </div> */}

        <div className="gap-[20px] flex flex-col">
          <div>
            <Input
              name="name"
              type="text"
              placeholder="Company name e.g.(govlead group)"
              className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#000000]"
            />
          </div>

          <div>
            <Input
              name="email"
              type="email"
              placeholder="Company email e.g.(govlead@email.co.za)"
              className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#000000]"
            />
          </div>

          <div>
            <Input
              name="contact"
              type="digit"
              placeholder="+27 99 999 9999"
              className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#000000]"
            />
          </div>
        </div>
      </form>
      <Separator orientation="vertical" className="h-full" />
    </motion.div>
  );
}
