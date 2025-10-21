"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { useMenu } from "@/context/side-menu";
import { motion } from "motion/react";
import { Label } from "../ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeContext } from "@/context/themeContext";
import { useTheme } from "next-themes";
import SignOutButton from "./logout/logout";
import { Button } from "../ui/button";
import { Ring } from "ldrs/react";

export default function header() {
  const { isOpen, setIsOpen } = useMenu();

  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const { theme, setTheme } = useTheme();

  const [loading, setLoading] = useState(false);

  return (
    <div className=" w-full md:px-[5%] lg:px-[10%] ">
      <div className="flex flex-row w-full items-center justify-between ">
        {/** Logo image */}
        <div className="flex justify-center items-center h-[80px] w-auto  object-cover">
          <Link href={"/"}>
            <Image
              src={"/parent_logo.png"}
              width={180}
              height={180}
              className="object-fill"
              alt="parent_logo_image"
            />
          </Link>
        </div>

        {/* large navigation screens */}
        <div className="hidden md:flex  flex-row gap-[20px]">
          <div className="h-[80px] flex justify-center items-center">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <MdDarkMode
                  size={30}
                  onClick={() => {
                    toggleTheme("light");
                  }}
                  color="white"
                />
              ) : (
                <MdOutlineLightMode
                  size={30}
                  onClick={() => {
                    toggleTheme("dark");
                  }}
                  color="black"
                />
              )}
            </button>
          </div>

          <Separator orientation="vertical" />
          <div className="h-[80px] flex justify-center items-center">
            <SignOutButton>
              <button
                onClick={() => {
                  setLoading(true);
                }}
                className="w-[100%] rounded-3xl flex flex-row justify-center items-center bg-none h-[40px] cursor-pointer text-white dark:text-white hover:bg-none"
              >
                {loading == true ? (
                  <Ring size={15} speed={1.5} bgOpacity={0.25} color="white" />
                ) : (
                  <div className="flex flex-row items-center justify-center text-black dark:text-white gap-[20px]">
                    <IoMdExit
                      size={30}
                      color={`${currentTheme == "dark" ? "white" : "black"}`}
                    />{" "}
                    Logout
                  </div>
                )}
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* Small navigation screens */}
        <div className="flex md:hidden h-[60px] w-[80px] mx-[15px] justify-center items-center">
          {currentTheme == "dark" ? (
            <GiHamburgerMenu
              size={"25px"}
              color="#fff"
              onClick={() => {
                setIsOpen(true);
                console.log(isOpen);
              }}
            />
          ) : (
            <GiHamburgerMenu
              size={"30px"}
              color="#000000"
              onClick={() => {
                setIsOpen(true);
                console.log(isOpen);
              }}
            />
          )}
        </div>

        {/** first header section */}
      </div>
      <div className=" ">
        {isOpen && (
          <motion.div
            exit={{ opacity: 0, scaleX: 0 }}
            initial={{ opacity: 0.2, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 top-0 right-0 w-[300px] h-screen bg-[#f7f7f7] dark:bg-[#242424] shadow-md "
          >
            <div>
              {currentTheme == "dark" ? (
                <MdClose
                  className="m-[20px]"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  size={"35px"}
                  color="white"
                />
              ) : (
                <MdClose
                  className="m-[20px]"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  size={"35px"}
                  color="black"
                />
              )}
            </div>
            <div className="flex flex-col gap-5 my-[20px] px-[20px]">
              <div className="mt-[50px] h-[20px] flex flex-row items-center justify-between itece">
                <Label>Dark mode?</Label>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <MdDarkMode
                      size={30}
                      onClick={() => {
                        toggleTheme("light");
                      }}
                      color="white"
                    />
                  ) : (
                    <MdOutlineLightMode
                      size={30}
                      onClick={() => {
                        toggleTheme("dark");
                      }}
                      color="black"
                    />
                  )}
                </button>
              </div>
              <Separator />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
