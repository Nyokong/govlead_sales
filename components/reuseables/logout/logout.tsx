"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

type SignOutButtonProps = {
  children: React.ReactNode;
};

export default function SignOutButton({ children }: SignOutButtonProps) {
  const handleSignOut = async () => {
    const logout = await signOut({
      redirect: false,
    });

    if (logout) {
      redirect("/");
    }
  };

  return <div onClick={handleSignOut}>{children}</div>;
}
