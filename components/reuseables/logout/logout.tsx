"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { logoutAction } from "./logoutaction";

type SignOutButtonProps = {
  children: React.ReactNode;
};

export default function SignOutButton({ children }: SignOutButtonProps) {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    if (session?.user) {
      await logoutAction(session?.user?.id);
    }

    const logout = await signOut({
      redirect: false,
    });

    if (logout) {
      redirect("/");
    }
  };

  return <div onClick={handleSignOut}>{children}</div>;
}
