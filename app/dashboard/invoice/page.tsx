"use client";

import React, { useEffect, useRef, useState } from "react";

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
import { useUxContext } from "@/context/userux";
import { Label } from "@/components/ui/label";
import { Tilt } from "react-tilt";
import Image from "next/image";
import { useDelayedTrue } from "@/app/_hooks/delayedStart";
import Bloader from "@/components/reuseables/b-loader";
import {
  IconAlertTriangleFilled,
  IconRosetteDiscountCheckFilled,
  IconX,
} from "@tabler/icons-react";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 20, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

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
  const { uxloading, toggleLoading } = useUxContext();

  const [flat, setFlat] = useState<FlatInvoiceType[]>([]);

  const [isCreateInvoice, setIsCreateInvoice] = useState(false);
  const [isOpenCreditEdit, setOpenCreditEdit] = useState(false);

  const isReady = useDelayedTrue(isOpenCreditEdit);
  // const isReady = useDelayedTrue(2000);

  // form inputs
  const [isCompanyName, setCompanyName] = useState("");
  const [isCompanyEmail, setCompanyEmail] = useState("");
  const [isCompanyContact, setComapanyContact] = useState("");

  const [isCardNumber, setCardNumber] = useState(0);
  const [isCardHolderName, setCardHolderName] = useState("");
  const [isExpDate, setExpDate] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFormError, setFormError] = useState("");
  // const [isFormErrorCard, setFormCardError] = useState("");

  const [isSendLogCompanyData, setIsLogCompanyData] = useState("");
  const [isSendLoader, setSendLoader] = useState(false);
  const [isLogSuccess, setLogSuccess] = useState(false);
  const [isSuccessMsg, setSuccessMsg] = useState("");
  const delay = 3000;

  // useEffect(() => {
  //   setIsCreateInvoice(false);
  //   if (isSelected == -1) {
  //     setIsCreateInvoice(false);
  //   }
  // }, []);

  useEffect(() => {
    if (uxloading) {
      toggleLoading(false);
      console.log(uxloading);
    }
  }, [uxloading]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLogSuccess) {
      timer = setTimeout(() => {
        setLogSuccess(false);
        setIsCreateInvoice(true);
        console.log(isCreateInvoice, "is Create Invoice not True?");
      }, delay); // ✅ false after delay
    }

    return () => clearTimeout(timer);
  }, [isLogSuccess]);

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;

  //   if (!isLogSuccess && isCreateInvoice) {
  //     timer = setTimeout(() => {
  //       console.log("now show invoice");
  //     }, 1000); // ✅ false after delay
  //   }

  //   return () => clearTimeout(timer);
  // }, [isLogSuccess]);

  // const linkCreditCard = () => {
  //   let isMounted = true;

  //   setTimeout(() => {
  //     if (isMounted) {
  //       // console.log("2 seconds later!");
  //       setOpenCreditEdit(true);
  //       // safe to update state here
  //     }
  //   }, 2000);

  //   return () => {
  //     isMounted = false; // cleanup if needed
  //   };
  // };

  const creditCardNumberFormat = (isCardNum: number) => {
    if (isCardNum == 0) {
      return "0000 0000 0000 0000";
    }

    const digits = isCardNum.toString().replace(/\D/g, ""); // remove non-digits just in case
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim(); // insert space every 4 digits

    return formatted;
  };

  const cardHolderFormat = (isHolder: string, title: string = ""): string => {
    if (!isHolder.trim()) return `${title} J. Doe`.trim();

    const cleaned = isHolder.trim().replace(/\s+/g, " "); // normalize spaces
    const parts = cleaned.split(" ");

    let firstInitial = "";
    let lastName = "";

    if (parts.length === 1) {
      // Handle single-word input like "KingMadula"
      firstInitial = parts[0][0];
      lastName = parts[0].slice(1);
    } else {
      firstInitial = parts[0][0];
      lastName = parts.slice(1).join(" ");
    }

    return `${title} ${firstInitial}. ${lastName}`.trim();
  };

  const cardExpFormat = (isExp: string): string => {
    // Remove all non-digit characters
    const digits = isExp.replace(/\D/g, "").slice(0, 4); // Limit to 4 digits

    if (digits.length === 0) return "01/01";

    // Format as MM/YY
    if (digits.length <= 2) {
      return `${digits}/01`;
    } else if (digits.length <= 3) {
      return `${digits.slice(0, 2)}/${digits.toString()[2]}1`;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
  };

  const cardNumberChangeFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, ""); // remove non-digits

    if (raw.length > 16) raw = raw.slice(0, 16); // enforce 16-digit max

    // const formatted = raw.replace(/(.{4})/g, "$1 ").trim(); // format with spaces
    setCardNumber(Number(raw));
  };

  const generateInvoiceId = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";
    for (let i = 0; i < 8; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `GL${randomPart}`;
  };

  // const generateUniqueInvoiceId = async (checkExists: (id: string) => Promise<boolean>): Promise<string> => {
  //   let id = generateInvoiceId();
  //   while (await checkExists(id)) {
  //     id = generateInvoiceId(); // regenerate if it exists
  //   }
  //   return id;
  // };

  const SumbitCompanyDetails = () => {
    setSendLoader(true);

    if (
      !isCompanyName ||
      !isCompanyEmail ||
      !isCompanyContact ||
      isSelected == -1
    ) {
      setFormError("Inputs error - Please check if you inserted data!!!");
      setSendLoader(false);
    } else {
      // console.log(isCompanyName, isCompanyEmail, isCompanyContact);
      // setIsCreateInvoice(true);

      fetch("/api/functions/addcompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: isCompanyName,
          companyEmail: isCompanyEmail,
          companyContact: isCompanyContact,
        }),
      })
        .then(async (res) => {
          const data = await res.json(); // ✅ read once

          if (!res.ok) {
            setIsLogCompanyData(data.error || "Unknown error");
            // throw new Error(`Server error: ${res.status}`);
            setLogSuccess(false);
          } else {
            // success path
            setLogSuccess(true);
            setSuccessMsg(data.msg);

            const SERVICE_FEE = 500; // constant fee

            services.map((entry) => {
              if (entry.id === isSelected) {
                setFlat((prev) => {
                  const updated = [...prev];
                  const existingIndex = updated.findIndex(
                    (item) =>
                      item.companyName === isCompanyName &&
                      item.companyEmail === isCompanyEmail &&
                      item.companyContact === Number(isCompanyContact)
                  );

                  const newService = {
                    name: entry.name,
                    price: entry.price,
                    frequency: entry.frequency,
                  };

                  if (existingIndex !== -1) {
                    // Merge service into existing company
                    const existing = updated[existingIndex];
                    existing.service.push(newService);
                    existing.total =
                      existing.service.reduce((sum, s) => sum + s.price, 0) +
                      SERVICE_FEE;
                    updated[existingIndex] = existing;
                    return updated;
                  }

                  // Create new company entry
                  return [
                    ...updated,
                    {
                      companyName: isCompanyName,
                      companyEmail: isCompanyEmail,
                      companyContact: Number(isCompanyContact),
                      service: [newService],
                      invoiceId: generateInvoiceId(),
                      total: entry.price + SERVICE_FEE,
                      servicefee: SERVICE_FEE,
                    },
                  ];
                });
              }
            });
          }
        })
        .catch((err) => {
          // setLogSuccess(true);
          console.error("Request failed:", err.message);
        });

      // clean the state
      setSendLoader(false);
      setFormError("");
      setCompanyName("");
      setCompanyEmail("");
      setComapanyContact("");
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
    <div className="relative min-h-[100vh]">
      <Header />

      {isLogSuccess && (
        <motion.div
          initial={{ opacity: 0.2 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.25, ease: "easeIn" },
          }}
          className="absolute z-20 flex justify-center items-center w-full h-[100%] md:h-[100px] dark:bg-[#3636368f] bg-[#f3f3f38f]"
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.25, ease: "easeIn" },
            }}
            className="flex flex-row px-[20px] items-center gap-4"
          >
            <div className="flex flex-row justify-start gap-4 px-[40px] py-[10px] items-center w-[300px] rounded-2xl dark:bg-[#49b334] bg-[#49b334] dark:text-white text-white shadow-[#4b4b4b] shadow-sm inset-shadow-sm">
              <IconRosetteDiscountCheckFilled color="white" />
              <p>{isSuccessMsg}</p>
            </div>
            <button
              onClick={() => {
                setLogSuccess(false);
              }}
              className=" h-[30px] w-[30px] cursor-pointer rounded-3xl hover:rotate-[45deg] ease-in-out transition-transform duration-250 hover:dark:bg-[#2e2e2e] flex justify-center items-center"
            >
              <IconX />
            </button>
          </motion.div>
        </motion.div>
      )}

      {isSendLoader ? (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute z-20 flex justify-center items-center w-full h-full dark:bg-[#3636368f] bg-[#f3f3f38f]"
        >
          <Bloader />
        </motion.div>
      ) : (
        isSendLogCompanyData && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute z-20 flex justify-center items-center w-full h-full dark:bg-[#3636368f] bg-[#f3f3f38f]"
          >
            <div className="flex justify-center items-center flex-col w-[300px] gap-[20px] py-[40px] rounded-4xl shadow-sm dark:shadow-[#535353] h-auto bg-[#fdfdfd] dark:bg-[#3a3a3a] dark:text-white">
              <div className="flex justify-end w-full flex-row px-[20px]">
                <button
                  onClick={() => {
                    setIsLogCompanyData("");
                  }}
                  className=" h-[30px] w-[30px] cursor-pointer rounded-3xl hover:rotate-[45deg] ease-in-out transition-transform duration-250 hover:bg-[#2e2e2e] flex justify-center items-center"
                >
                  <IconX />
                </button>
              </div>
              <IconAlertTriangleFilled className="h-[140px] w-[140px] bg-amber-700 p-5 rounded-2xl" />
              <p className="w-[90%] mx-[20px] flex justify-center items-center">
                {isSendLogCompanyData}
              </p>
            </div>
          </motion.div>
        )
      )}

      {isCreateInvoice == true ? (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute z-20 flex justify-center w-full h-full dark:bg-[#363636e3] bg-[#f3f3f3e1]"
        >
          <div>
            <div className="w-full flex justify-center items-center mb-[10px] h-auto px-[20px] md:max-w-[85vw] lg:max-w-[80vw]">
              <button
                onClick={() => {
                  setIsCreateInvoice(false);
                  setFlat([]);
                }}
                className="mt-[40px] cursor-pointer w-[200px] h-[50px] bg-red-500 text-white rounded-2xl shadow-sm inset-shadow-sm"
              >
                Close Invoice
              </button>
            </div>

            {flat.length > 0 && <Newinvoice flatlist={flat} />}
          </div>
        </motion.div>
      ) : (
        <div></div>
      )}

      <div className="flex justify-center flex-col items-center">
        <div className="h-[100px] mt-[20px] py-[10px] w-full justify-center flex items-center">
          <h1 className="text-2xl font-semibold font-mono">Client Details</h1>
        </div>
        <div className="flex gap-4 justify-center flex-col-reverse md:flex-row items-center my-[30px]">
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <form
              action=""
              className="px-[20px] w-[370px] sm:w-[430px] h-auto flex flex-col gap-4 dark:bg-[#292929] py-[40px] rounded-3xl"
            >
              <div className="gap-[20px] flex flex-col">
                {isFormError && (
                  <div>
                    <p className="text-red-600">{isFormError}</p>
                  </div>
                )}

                <div className="flex gap-4 ">
                  <Label className="w-[100px]">Company Name</Label>
                  <Input
                    name="name"
                    type="text"
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name e.g.(govlead group)"
                    className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#ffffff]"
                  />
                </div>

                <div className="flex gap-4 ">
                  <Label className="w-[100px]">Company Email</Label>
                  <Input
                    name="email"
                    type="email"
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="Company email e.g.(govlead@email.co.za)"
                    className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#ffffff]"
                  />
                </div>

                <div className="flex gap-4 ">
                  <Label className="w-[100px]">Company Contact</Label>
                  <Input
                    name="contact"
                    type="digit"
                    onChange={(e) => setComapanyContact(e.target.value)}
                    placeholder="+27 99 999 9999"
                    className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#ffffff]"
                  />
                </div>

                <div className="flex gap-4 ">
                  <Label className="w-[300px]">Pick Service</Label>
                  <Select
                    onValueChange={(value) => {
                      // console.log("Options: ", value);
                      setIsSelected(Number(value));
                    }}
                  >
                    <SelectTrigger className="w-[300px] h-[50px] rounded-4xl bg-[#fff] md:w-full justify-between items-center">
                      <SelectValue
                        className=" h-[50px]"
                        placeholder="Select a service"
                      />
                    </SelectTrigger>
                    <SelectContent className="w-[300px]">
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
          </motion.div>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="md:h-[300px] h-[2px] w-[300px] md:w-[2px] bg-[#fff]"
          ></motion.div>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="px-[20px] md:h-[320px] w-[370px] sm:w-[430px] h-auto flex flex-col gap-4 dark:bg-[#292929] py-[40px] rounded-3xl"
          >
            <h1 className="dark:text-[#fff] text-3xl">
              {isCompanyName == "" ? "John Doe" : isCompanyName}
            </h1>
            <h2>
              {isCompanyEmail == "" ? "johndoe@govlead.co.za" : isCompanyEmail}
            </h2>
            <h3>
              {isCompanyContact == "" ? "+27 00 000 0000" : isCompanyContact}
            </h3>
          </motion.div>
        </div>

        {!isOpenCreditEdit && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => {
                setOpenCreditEdit((prev) => !prev);
              }}
              className="cursor-pointer h-[40px] w-auto px-[20px] rounded-4xl bg-black text-white dark:bg-[#f0f0f0] dark:text-black"
            >
              {isReady ? (
                <div className="flex flex-row gap-2 items-center">
                  <Bloader /> <p>linking...</p>
                </div>
              ) : (
                "Add Credit Card"
              )}
            </button>
          </motion.div>
        )}

        {isOpenCreditEdit && (
          <div className="flex gap-4 justify-center flex-col md:flex-row items-center">
            <div className="mb-[10px]">
              <button
                className="flex h-[40px] w-[200px] cursor-pointer dark:bg-[#2e2e2e] rounded-4xl justify-center items-center"
                onClick={() => {
                  setOpenCreditEdit(false);
                }}
              >
                Remove Credit Card
              </button>
            </div>
            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center px-[20px] md:h-[320px] w-[370px] sm:w-[430px] dark:bg-[#1f1f1f] h-auto py-[40px] rounded-3xl"
            >
              <Tilt
                options={defaultOptions}
                style={{ height: 213, width: 337 }}
              >
                <div className="relative h-[213px] w-[337px] rounded-2xl text-white bg-[#3a4097] ">
                  <div className="absolute top-[30%] left-[20px] font-mono text-[16px]">
                    {creditCardNumberFormat(isCardNumber)}
                  </div>
                  <div className="absolute top-[18%] left-[20px] font-mono text-[16px]">
                    <span className="text-[7px]">Card Holder:</span>{" "}
                    <span className="text-[10px]">
                      {cardHolderFormat(isCardHolderName)}
                    </span>
                  </div>
                  <div className="absolute top-[50%] right-[20px]">
                    <Image
                      src={"/chip.png"}
                      width={80}
                      height={50}
                      alt="chip"
                    />
                  </div>
                  <div className="absolute bottom-[10%] left-[20px] font-mono text-[16px]">
                    <span className="text-[7px]">Exp Date:</span>{" "}
                    <span className="text-[10px]">
                      {cardExpFormat(isExpDate)}
                    </span>
                  </div>
                </div>
              </Tilt>
            </motion.div>
            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="md:h-[300px] h-[2px] w-[300px] md:w-[2px] bg-[#fff]"
            ></motion.div>
            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <form
                action=""
                className="px-[20px] w-[370px] sm:w-[430px] h-auto flex flex-col gap-4 dark:bg-[#292929] py-[40px] rounded-3xl"
              >
                <div className="gap-[20px] flex flex-col">
                  {/* {isFormErrorCard && (
                    <div>
                      <p className="text-red-600">{isFormErrorCard}</p>
                    </div>
                  )} */}

                  <div className="flex gap-4 ">
                    <Label className="w-[100px]">Card Number</Label>
                    <Input
                      name="card_number"
                      type="digit"
                      ref={inputRef}
                      maxLength={16}
                      onChange={cardNumberChangeFormat}
                      placeholder="Add Card Number Here!... "
                      className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#ffffff]"
                    />
                  </div>

                  <div className="flex gap-4 ">
                    <Label className="w-[100px]">Card Holder</Label>
                    <Input
                      name="card_holder"
                      type="text"
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder="e.g. Name Surname!... "
                      className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#ffffff]"
                    />
                  </div>

                  <div className="flex gap-4 ">
                    <Label className="w-[100px]">Expiry Date</Label>
                    <Input
                      name="card_expdate"
                      type="digit"
                      maxLength={4}
                      onChange={(e) => setExpDate(e.target.value)}
                      placeholder="01/30"
                      className="w-full h-[50px] bg-[#ffffff] rounded-3xl inset-shadow-sm inset-shadow-black-900 dark:text-[#ffffff]"
                    />
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}

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
      <div className="flex justify-center items-center mt-5">
        <div className="w-full flex justify-center items-center mb-[40px] h-auto px-[20px] md:max-w-[85vw] lg:max-w-[80vw]">
          <Button
            onClick={() => {
              SumbitCompanyDetails();
            }}
            className="cursor-pointer w-[300px] h-[60px] rounded-4xl"
          >
            Create Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
