"use client";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

import React from "react";

export default function Loading() {
  return (
    <div className="w-[100vw] h-[50vh] flex justify-center items-center ">
      <Ring size={20} speed={1.5} bgOpacity={0.25} color="black" />
    </div>
  );
}
