"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function header() {
  return (
    <div className="w-full px-[10%] bg-[#6c72c0]">
      <div className="flex flex-row  w-full items-center ">
        {/** Logo image */}
        <div className="flex justify-center items-center h-[80px] w-auto bg-[#fff] object-cover">
          <Link href={"/"}>
            <Image
              src={"/parent_logo.png"}
              width={150}
              height={150}
              className="object-fill"
              alt="parent_logo_image"
            />
          </Link>
        </div>

        {/** first header section */}
      </div>
    </div>
  );
}
