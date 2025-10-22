"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { accounts } from "@/db/schema";

export async function logoutAction(id: string) {
  await db
    .update(accounts)
    .set({ session_state: false })
    .where(eq(accounts.userId, id));
}
