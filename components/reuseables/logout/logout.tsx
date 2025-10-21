"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

type SignOutButtonProps = {
  email: string;
  children: React.ReactNode;
};

export default function SignOutButton({ email, children }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    const logout = await signOut({
      redirect: false,
    });

    if (logout) {
      redirect("/");
    }
  };

  return <div onClick={handleSignOut}>{children}</div>;
}
