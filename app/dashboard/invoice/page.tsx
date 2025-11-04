"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Header from "@/components/reuseables/header";
import { motion } from "motion/react";
import { useFormInvoice } from "@/context/createinvoice-form";
// import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";
// import Template from "@/components/reuseables/invoice/template";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlatInvoiceType } from "@/types/next-auth";
import Newinvoice from "@/components/reuseables/invoice/newinvoice";
import Template from "@/components/reuseables/invoice/template";

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

export default function Invoice() {
  // const { currentTheme, toggleTheme } = useContext(ThemeContext);
  // const flat: FlatInvoiceType[] = [];

  const { isSelected, setIsSelected } = useFormInvoice();

  const [flat, setFlat] = useState<FlatInvoiceType[]>([]);

  const [isCreateInvoice, setIsCreateInvoice] = useState(false);

  // form inputs
  const [isCompanyName, setCompanyName] = useState("");
  const [isCompanyEmail, setCompanyEmail] = useState("");
  const [isCompanyContact, setComapanyContact] = useState("");

  const [isFormError, setFormError] = useState("");

  useEffect(() => {
    if (isSelected != -1) {
      setIsCreateInvoice(true);
    }
  }, []);

  const SumbitCompanyDetails = () => {
    if (
      !isCompanyName ||
      !isCompanyEmail ||
      !isCompanyContact ||
      isSelected == -1
    ) {
      setFormError("Inputs error - Please check if you inserted data!!!");
    } else {
      // console.log(isCompanyName, isCompanyEmail, isCompanyContact);
      setIsCreateInvoice(true);

      services.map((entry) => {
        if (entry.id == isSelected) {
          setFlat((prev) => [
            ...prev,
            {
              companyName: isCompanyName,
              companyEmail: isCompanyEmail,
              companyContact: Number(isCompanyContact),
              service: [
                {
                  name: entry.name,
                  price: entry.price,
                  frequency: entry.frequency,
                },
              ],
            },
          ]);
        }
      });

      console.log(flat);
    }
  };

  // const getColorVariant = (index: number) => {
  //   if (index % 2 == 0) {
  //     // this is an odd number
  //     return "bg-[#5758D9] dark:bg-[#CCCCFF] dark:text-[#000] text-white";
  //   } else {
  //     return "bg-[#7A7AFF] dark:bg-[#E0E0FF] dark:text-[#000] text-white";
  //   }
  // };

  return (
    <div className="relative">
      <Header />

      <div className="flex justify-center flex-col items-center">
        <div className="h-[100px] mt-[20px] py-[10px] w-full justify-center flex items-center">
          <h1 className="text-2xl font-semibold font-mono">Client Details</h1>
        </div>
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <form
            action=""
            className="px-[20px] w-[370px] sm:w-[430px] h-auto flex flex-col gap-4 p-[20px]"
          >
            <div className="gap-[20px] flex flex-col">
              {isFormError && (
                <div>
                  <p className="text-red-600">{isFormError}</p>
                </div>
              )}

              <div>
                <Input
                  name="name"
                  type="text"
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company name e.g.(govlead group)"
                  className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#000000]"
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="Company email e.g.(govlead@email.co.za)"
                  className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#000000]"
                />
              </div>

              <div>
                <Input
                  name="contact"
                  type="digit"
                  onChange={(e) => setComapanyContact(e.target.value)}
                  placeholder="+27 99 999 9999"
                  className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#000000]"
                />
              </div>

              <div>
                <Select
                  onValueChange={(value) => {
                    // console.log("Options: ", value);
                    setIsSelected(Number(value));
                  }}
                >
                  <SelectTrigger className="w-full bg-[#fff] md:w-full justify-between items-center">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Service Options</SelectLabel>
                      {services.map((entry, idx) => (
                        <div key={idx}>
                          <SelectItem value={`${entry.id}`}>
                            {entry.name}
                          </SelectItem>
                        </div>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
          <div className="flex justify-center items-center ">
            <div className="w-full flex justify-center items-center mb-[40px] h-auto px-[20px] md:max-w-[85vw] lg:max-w-[80vw]">
              <Button
                onClick={() => {
                  SumbitCompanyDetails();
                }}
                className="cursor-pointer w-[300px] h-[60px] "
              >
                Create Invoice
              </Button>
            </div>
          </div>
        </motion.div>

        {/* <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:max-w-[85vw] lg:max-w-[80vw] bg-[#ffffff] rounded-4xl p-[10px] justify-center items-center gap-[20px] w-full h-full py-[20px]"
        >
          {services.map((entry, idx) => (
            <motion.div
              key={idx}
              className={` ${
                isSelected == entry.id
                  ? "bg-[#56DB87] shadow-md"
                  : getColorVariant(idx)
              } relative h-[140px] min-w-[320px] md:min-w-[320px] lg:min-w-[260px] xl:min-w-[340px] 2xl:min-w-[360px] cursor-pointer justify-self-center p-[10px] shadow-sm inset-shadow-sm rounded-2xl `}
              onClick={() => {
                setIsSelected(idx);
              }}
            >
              <div className="flex flex-col justify-between">
                <div className="h-[40px] w-[40px] absolute top-2 right-2 rounded-full ">
                  {isSelected == entry.id ? (
                    <IconCircleCheckFilled size={40} />
                  ) : (
                    <IconCircleCheck size={30} />
                  )}
                </div>
                <h1>{entry.name}</h1>
                <h4 className="text-[30px] font-bold">
                  {formatCurrency(entry.price)}
                </h4>
                <p
                  className={`${
                    isSelected == entry.id ? "text-black" : "text-black"
                  } h-[40px] w-[100px] my-[10px] flex justify-center items-center rounded-3xl bg-white`}
                >
                  {entry.frequency}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>

      {/* <div className="flex justify-center items-center ">
        <div className="w-full flex justify-center items-center mb-[40px] bg-pink-500 h-auto p-[20px] md:max-w-[85vw] lg:max-w-[80vw]">
          <Button
            onClick={() => {
              setIsCreateInvoice(true);
            }}
            className="cursor-pointer w-[300px] h-[100px] "
          >
            Create Invoice
          </Button>
        </div>
      </div> */}

      {isCreateInvoice && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-center items-center ">
            <div className="w-full flex justify-center items-center mb-[40px] h-auto px-[20px] md:max-w-[85vw] lg:max-w-[80vw]">
              <button
                onClick={() => {
                  setIsCreateInvoice(false);
                  setFlat([]);
                }}
                className="cursor-pointer w-[300px] h-[60px] bg-red-500 text-white rounded-2xl shadow-sm inset-shadow-sm"
              >
                Clear Invoice
              </button>
            </div>
          </div>

          {flat.length > 0 && <Newinvoice flatlist={flat} />}
        </motion.div>
      )}

      {/* : (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-center items-center ">
            <div className="w-full flex justify-center items-center mb-[40px] h-auto px-[20px] md:max-w-[85vw] lg:max-w-[80vw]">
              <button
                onClick={() => {
                  setIsCreateInvoice(false);
                  setFlat([]);
                }}
                className="cursor-pointer w-[300px] h-[60px] bg-red-500 text-white rounded-2xl shadow-sm inset-shadow-sm"
              >
                Clear Invoice
              </button>
            </div>
          </div>
          <Template />
        </motion.div>
      ) */}
    </div>
  );
}
