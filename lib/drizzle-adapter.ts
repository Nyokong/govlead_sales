// lib/auth/drizzle-adapter.ts
import { Adapter, AdapterUser } from "@auth/core/adapters";
import { db } from "../db"; // your Drizzle instance
import { users } from "@/db/schema"; // your users table

export const drizzleAdapter: Adapter = {
  async createUser(user: AdapterUser): Promise<AdapterUser> {
    const created = await db.insert(users).values(user).returning();
    return created[0];
  },
  // implement other methods like getUser, getSession, etc.
};
