import Google from "next-auth/providers/google";
// import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import GoogleProvider from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { LoginSchema } from "./loginschema";

export default {
  providers: [
    Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validated = LoginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email } = validated.data;
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1)
          .then((res) => res[0]);

        if (user) {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
