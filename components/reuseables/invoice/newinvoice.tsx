import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { ThemeContext } from "@/context/themeContext";
import { FlatInvoiceType } from "@/types/next-auth";
import { IconCornerDownRight } from "@tabler/icons-react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdfdownload from "../pdf/invoicedoc";

type Props = {
  flatlist: FlatInvoiceType[];
};

export default function Newinvoice({ flatlist }: Props) {
  // const { currentTheme } = useContext(ThemeContext);
  const [todaydate, setTimestamp] = React.useState<string | null>(null);
  useEffect(() => {
    const fulldatestring = new Date();

    setTimestamp(
      fulldatestring.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const pdfref = useRef(null);

  //   useEffect(() => {
  //     console.log(flatlist);
  //   }, []);

  // const todaydate = ` ${fulldatestring.getDay()} ${fulldatestring.toLocaleString(
  //   "en-ZA",
  //   { month: "long" }
  // )} ${fulldatestring.getFullYear()}`;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(value);
  };

  return (
    <div>
      <div ref={pdfref} className="flex justify-center items-center py-[20px]">
        <div
          className={`relative w-[360px] h-[482px] md:h-[877px] md:w-[640px] bg-[#463cd8] dark:bg-[#4036cc] p-[30px] shadow-2xl text-white`}
        >
          <div className="flex flex-row justify-between ">
            <div className="h-[50px] w-[120px] md:w-[150px] md:h-[80px] overflow-hidden flex justify-center items-center">
              <Image
                src={"/parent_logoWTrans.png"}
                width={180}
                height={180}
                className="object-fill "
                alt="parent_logo_image"
              />
            </div>
            <div className="h-[50px] md:h-[100px] w-auto flex flex-col justify-start text-[10px] md:text-[18px]">
              <p>+27 71 219 8630</p>
              <p> info@govlead.co.za</p>
              <p> www.govlead.co.za</p>
            </div>
          </div>

          <div className="px-[10px] md:my-0 my-4">
            <Separator />
          </div>

          <div className="h-[80px] md:h-[120px] text-[10px] md:text-[18px] my-2  py-[10px] px-[10px] flex justify-between items-center w-full">
            <div className="h-full  flex flex-col justify-between">
              <div className=" h-[20%]">
                <p>BILL TO</p>
              </div>
              <div>
                {flatlist.map((entry, idx) => (
                  <div key={idx}>
                    <p>{entry.companyName}</p>
                    <p>{entry.companyEmail}</p>
                    <p>{entry.companyContact}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-full flex flex-col gap-2">
              <div className=" h-[20%]">
                <p>INVOICE DATE</p>
              </div>

              <div>
                <p>{todaydate}</p>
              </div>
            </div>
          </div>
          <div className="px-[10px] my-[10px]">
            <Separator />
          </div>

          <div className="h-[auto] text-[10px] md:text-[18px] px-[10px]">
            <p>
              INVOICE ID:{" "}
              {flatlist.map((entry, idx) => (
                <span key={idx}>{entry.invoiceId}</span>
              ))}
            </p>
          </div>

          <div className="mt-[10px] md:mt-[40px] dark:bg-[#3f36c0] flex flex-col gap-[20px]">
            <div className="px-[10px]">
              <Separator />
            </div>
            <div className="px-[10px] text-[10px] md:text-[18px] w-full flex flex-row justify-between">
              <p className="w-[60%]">SERVICE DESCRIPTION</p>
              <div className="w-[40%] flex flex-row justify-between">
                {/* <p className="w-[50%] justify-start ">PRICE</p> */}
                <p className="w-[100%] flex justify-end px-2.5">TOTAL</p>
              </div>
            </div>
            <div className="px-[10px]">
              <Separator />
            </div>
          </div>

          <div className="mt-[10px] flex flex-col gap-[20px] ">
            {flatlist.map((i, idx) => (
              <div
                key={idx}
                className="px-[10px] w-full flex flex-row justify-between text-[10px] md:text-[18px]"
              >
                <div className="w-[60%] text-[10px] md:text-[18px]">
                  <div className="px-[20px] mt-[5px] w-full">
                    <div className="flex flex-col justify-between">
                      {i.service.map((p, pdx) => (
                        <div
                          key={pdx}
                          className="flex flex-row gap-4 justify-between"
                        >
                          <div className="flex flex-row gap-4 min-w-[120px]">
                            <IconCornerDownRight size={"15px"} />{" "}
                            <p className="text-[10px] md:text-[18px]   flex flex-row">
                              {p.name}
                            </p>
                          </div>
                          <p className="mx-2 text-[10px] md:text-[18px]">
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
          <div className="w-[85%] md:w-[93%] box-border gap-[10px] flex justify-center items-center absolute bottom-[10px]  md:bottom-[40px] ">
            <Button className="cursor-pointer px-[20px] text-[10px] md:text-[18px] md:px-[20px] py-[20px] dark:text-black text-black hover:text-red-600 bg-[#e6e6e6] md:flex justify-center items-center ">
              Record to Database
            </Button>
            <Button className="cursor-pointer px-[20px] text-[10px] md:text-[18px] md:px-[20px] py-[20px] dark:text-white text-white hover:text-red-600 bg-[#242424] md:flex justify-center items-center ">
              <PDFDownloadLink
                document={<Pdfdownload flatlist={flatlist} />}
                fileName="govlead_invoice.pdf"
              >
                {({ loading }) =>
                  loading ? "Loading document..." : "Quick Download!"
                }
              </PDFDownloadLink>
            </Button>

            {/* <Button
              className="cursor-pointer px-[70px] py-[20px] bg-[#c23030] md:flex justify-center items-center hidden"
              onClick={() => {
                // handlepdfDownload();
              }}
            >
              <Link href={"/dashboard/invoice/pdf"} className="text-white">
                Download PDF
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
