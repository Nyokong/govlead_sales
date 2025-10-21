"use client";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

import React from "react";

export default function Loading() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
      {/* {currentTheme == "dark" ? (
        <Ring size={30} speed={1.5} bgOpacity={0.25} color="white" />
      ) : (
      )} */}
      <Ring size={30} speed={1.5} bgOpacity={0.25} color="black" />
    </div>
  );
}
