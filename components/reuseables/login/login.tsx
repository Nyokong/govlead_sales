"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useActionState } from "react";
import { loginAction } from "./loginaction";
import Wloader from "../w-loader";

export function SignIn() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  if (state && "success" in state && state.success) {
    window.location.href = "/dashboard";
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center rounded-4xl py-[40px] h-auto sm:w-[400px] w-[320px]  bg-[#ffffff] shadow-sm inset-shadow-sm inset-shadow-black-900">
        <div className="flex justify-center items-center h-[80px] w-auto bg-[#fff] object-cover">
          <Image
            src={"/parent_logo.png"}
            width={180}
            height={180}
            className="object-fill"
            alt="parent_logo_image"
          />
        </div>
        <form action={formAction} className="flex flex-col gap-2 ">
          <Label className="flex flex-row gap-2 justify-center h-[30px] m-2">
            Email
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="enter your email"
            className="w-[250px] h-[40px] rounded-3xl inset-shadow-sm inset-shadow-black-900"
          />

          <Label className="flex flex-row gap-2 justify-center h-[30px] m-2">
            Password
          </Label>
          <Input
            name="password"
            type="password"
            placeholder="enter your password"
            className="w-[250px] h-[40px] rounded-3xl inset-shadow-sm inset-shadow-black-900"
          />

          <div className="flex justify-center mt-2">
            <Button
              type="submit"
              className="w-[200px] rounded-[50px] flex justify-center items-center h-[40px] cursor-pointer shadow-md inset-shadow-xs inset-shadow-gray-400 bg-[#202020]"
            >
              {isPending ? (
                <div className="flex flex-row gap-2 text-white">
                  <Wloader />
                  loading...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
