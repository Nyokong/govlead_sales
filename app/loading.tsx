"use client";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

import React from "react";

export default function Loading() {
  return (
    <div className="h-fit w-fit flex justify-center items-center m-2">
      <Ring size={20} speed={1.5} bgOpacity={0.25} color="black" />
    </div>
  );
}
