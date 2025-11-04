import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeContext } from "@/context/themeContext";
import { FlatInvoiceType } from "@/types/next-auth";
import { IconCornerDownRight } from "@tabler/icons-react";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  flatlist: FlatInvoiceType[];
};

export default function Newinvoice({ flatlist }: Props) {
  const { currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(flatlist);
  }, []);

  const fulldatestring = new Date();

  const todaydate = ` ${fulldatestring.getDay()} ${fulldatestring.toLocaleString(
    "en-ZA",
    { month: "long" }
  )} ${fulldatestring.getFullYear()}`;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(value);
  };

  return (
    <div>
      <div className="flex justify-center items-center py-[20px]">
        <div
          className={`relative w-[360px] md:h-[877px] md:w-[640px] bg-[#cbc7f5] dark:bg-[#362dad] p-[30px] shadow-2xl`}
        >
          <div className="flex flex-row justify-between ">
            <div className="h-16 w-16 md:w-[150px] md:h-[80px] overflow-hidden flex justify-center items-center">
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
            </div>
            <div className="h-[100px] w-auto flex flex-col justify-start ">
              <p>+27 71 219 8630</p>
              <p> info@govlead.co.za</p>
              <p> www.govlead.co.za</p>
            </div>
          </div>

          <div className="px-[10px]">
            <Separator />
          </div>

          <div>
            <div className="my-2 py-[10px] px-[10px] flex justify-between items-center w-full">
              <div>
                <p>BILL TO</p>
                {flatlist.map((entry, idx) => (
                  <div key={idx}>
                    <p>{entry.companyName}</p>
                    <p>{entry.companyEmail}</p>
                    <p>{entry.companyContact}</p>
                  </div>
                ))}
              </div>
              <div>
                <p>INVOICE Date</p>
                <p>{todaydate}</p>
              </div>
            </div>
          </div>

          <div className="mt-[40px] flex flex-col gap-[20px]">
            <div className="px-[10px]">
              <Separator />
            </div>
            <div className="px-[10px] w-full flex flex-row justify-between">
              <p className="w-[60%]">Service Description</p>
              <div className="w-[40%] flex flex-row justify-between">
                <p className="w-[50%] justify-start ">PRICE</p>
                <p className="w-[50%] flex justify-start">TOTAL</p>
              </div>
            </div>
            <div className="px-[10px]">
              <Separator />
            </div>
          </div>

          <div className="mt-[10px] flex flex-col gap-[20px]">
            {flatlist.map((i, idx) => (
              <div
                key={idx}
                className="px-[10px] w-full flex flex-row justify-between"
              >
                <div className="w-[60%]">
                  <div className="px-[20px] mt-[5px] w-full">
                    <div className="flex flex-col justify-between">
                      {i.service.map((p, pdx) => (
                        <div
                          key={pdx}
                          className="flex flex-row gap-4 justify-between"
                        >
                          <div className="flex flex-row gap-4">
                            <IconCornerDownRight size={"15px"} />{" "}
                            <p className="text-[15px]">{p.name}</p>
                          </div>
                          <p className="mx-2 text-[15px]">
                            {formatCurrency(p.price)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {flatlist.length < 1 && (
                      <div className=" my-2 ">
                        <Separator />
                      </div>
                    )}

                    {/* <div className="flex flex-row justify-between">
                      <p>Service fee</p>
                    </div> */}
                  </div>
                </div>
                {/* <div className="w-[40%] flex flex-row justify-between">
                  <p className="w-[50%] justify-start ">{i.price}</p>
                  <p className="w-[50%] flex justify-start">{i.total}</p>
                </div> */}
              </div>
            ))}
          </div>
          <div className=" flex justify-center items-center absolute bottom-[40px]  left-[200px]">
            <Button className="px-[70px] py-[20px] bg-[#c23030] md:block hidden">
              <Link href={"/dashboard/invoice/pdf"} className="text-white">
                Download PDF
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
