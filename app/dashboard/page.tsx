"use client";

import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import Loading from "../loading";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
// import { ThemeContext } from "@/context/themeContext";
import Header from "@/components/reuseables/header";
import { motion } from "motion/react";
import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconMailFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormInvoice } from "@/context/createinvoice-form";

const services = [
  { id: 0, name: "App Development", price: 100000, frequency: "once-off" },
  { id: 1, name: "Websites", price: 10000, frequency: "frequent" },
  { id: 2, name: "White-label", price: 3500, frequency: "frequent" },
  { id: 3, name: "Logo Design", price: 2500, frequency: "frequent" },
  { id: 4, name: "Poster design", price: 2000, frequency: "frequent" },
  { id: 5, name: "Photography", price: 3000, frequency: "frequent" },
  {
    id: 6,
    name: "BDP(Business Development Package)",
    price: 8000,
    frequency: "frequent",
  },
];

export default function Dashboard() {
  const { data: session, status } = useSession();

  const { setIsSelected, isSelected } = useFormInvoice();

  // const [generate, setGenerate] = useState(false);

  const getColorVariant = (index: number) => {
    if (index % 2 == 0) {
      // this is an odd number
      return "bg-[#5758D9] dark:bg-[#CCCCFF] dark:text-[#000] text-white";
    } else {
      return "bg-[#7A7AFF] dark:bg-[#E0E0FF] dark:text-[#000] text-white";
    }
  };

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
        <div className="flex flex-col md:flex-row justify-center items-start gap-2 px-[20px]">
          {/* <div className="w-full md:w-[20vw] min-h-[20vh]">
            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 bg-[#ffffff] dark:bg-[#5c5c5c]  w-[340px] p-2 md:min-h-[400px]"
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
          </div> */}
          <div>
            <div
              className={`font-sans w-full md:w-[80vw] grid grid-cols-1 md:grid-cols-4 place-items-center  items-center justify-center min-h-[20vh] pb-20 gap-2 sm:p-20 px-10 `}
            >
              {/* 
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
          </motion.div> */}
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="col-span-4 bg-[#ffffff] shadow-md rounded-2xl inset-shadow-sm dark:bg-[#5c5c5c] w-full h-[100px] flex gap-4 justify-center items-center"
              >
                <Button className="h-[60px] cursor-pointer px-[40px]">
                  <Link href={"/dashboard/invoice"}>Create Invoice</Link>
                </Button>
                <Button className="h-[60px] cursor-pointer px-[40px]">
                  Check Old Invoices
                </Button>
              </motion.div>

              <div className="my-[20px] w-full col-span-4">
                <Separator />
              </div>

              <div className="col-span-4 gap-[10px] flex flex-col-reverse  items-center justify-center ">
                <motion.div
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-auto py-[10px] flex items-center justify-center"
                >
                  <Button
                    onClick={() => {
                      setIsSelected(-1);
                    }}
                    className="h-[80px] px-[40px]"
                  >
                    Unselect/StartOver
                  </Button>
                </motion.div>
                <div className="bg-[#ffffff] shadow-md rounded-2xl inset-shadow-sm dark:bg-[#5c5c5c]">
                  <div className="w-full flex justify-center py-[20px]">
                    <h1 className="text-[40px] font-semibold">Services</h1>
                  </div>
                  <div className="my-[20px] w-full col-span-4 px-[20px]">
                    <Separator />
                  </div>
                  <motion.div
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className=" flex flex-wrap p-[10px] justify-center gap-[20px] w-full h-full  py-[20px]"
                  >
                    {services.map((entry, idx) => (
                      <motion.div
                        key={idx}
                        className={` ${
                          isSelected == entry.id
                            ? "bg-[#56DB87] shadow-md"
                            : getColorVariant(idx)
                        } relative h-[250px] w-[280px] p-[10px] shadow-sm inset-shadow-sm`}
                        onClick={() => {
                          setIsSelected(idx);
                        }}
                      >
                        <div>
                          <div className="h-[40px] w-[40px] absolute top-2 right-2 rounded-full ">
                            {isSelected == entry.id ? (
                              <IconCircleCheckFilled size={40} />
                            ) : (
                              <IconCircleCheck size={30} />
                            )}
                          </div>
                          <h1>{entry.name}</h1>
                          <h4>{entry.price}</h4>
                          <p>{entry.frequency}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/*<motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col col-span-2 gap-2  p-2 rounded-2xl w-full md:min-h-[400px]"
          >
            <div>
              <Link href={"/dashboard/invoice"}>go to invoice page</Link>
            </div>
          </motion.div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
