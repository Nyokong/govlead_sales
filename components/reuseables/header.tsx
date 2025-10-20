"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function header() {
  return (
    <div className="w-full md:px-[5%] lg:px-[10%] bg-[#6c72c0]">
      <div className="flex flex-row w-full items-center justify-between ">
        {/** Logo image */}
        <div className="flex justify-center items-center h-[80px] w-auto bg-[#fff] object-cover">
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
        <div className="hidden md:flex bg-amber-700"></div>

        {/* Small navigation screens */}
        <div className="flex md:hidden bg-amber-800 h-[60px] w-[80px] mx-[15px]"></div>

        {/** first header section */}
      </div>
    </div>
  );
}
