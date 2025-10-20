"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

// import { db } from "@/db";
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";

type SignOutButtonProps = {
  email: string;
  children: React.ReactNode;
};

export default function SignOutButton({ email, children }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    const logout = await signOut({
      redirect: false, // prevent automatic redirect
    });

    if (logout) {
      redirect("/");
    }
  };

  return <div onClick={handleSignOut}>{children}</div>;
}
