"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { loginAction } from "./loginaction";

export function SignIn() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state && "success" in state && state.success) {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-auto w-[400px]">
        <form action={formAction}>
          <Label className="flex flex-row gap-2 justify-center h-[30px] m-2">
            Email
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="enter your email"
            className="w-[250px] h-[40px] rounded-3xl"
          />
          <Label className="flex flex-row gap-2 justify-center h-[30px] m-2">
            Password
          </Label>
          <Input
            name="password"
            type="password"
            placeholder="enter your password"
            className="w-[250px] h-[40px] rounded-3xl"
          />

          <div className="flex justify-center mt-2">
            <Button
              type="submit"
              className="w-[200px] rounded-3xl flex justify-center items-center h-[40px] cursor-pointer"
            >
              {isPending ? "loading.." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
