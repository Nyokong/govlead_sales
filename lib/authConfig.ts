// auth config
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { accounts, users } from "@/db/schema";
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

        // const { email } = validated.data;
        // const user = await db
        //   .select()
        //   .from(users)
        //   .where(eq(users.email, email))
        //   .limit(1)
        //   .then((res) => res[0]);
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, `${credentials.email}`))
          .limit(1)
          .then((res) => res[0]);

        if (user) {
          const check = await db
            .select()
            .from(accounts)
            .where(eq(accounts.userId, user.id))
            .limit(1);

          // console.log(`from Session ${user.id}`);

          if (check.length > 0) {
            // console.log("found something");
            await db
              .update(accounts)
              .set({ session_state: true })
              .where(eq(accounts.userId, user.id));
          } else {
            await db
              .insert(accounts)
              .values({ userId: `${user.id}`, session_state: true });
            // console.log("didnt find something");
          }

          return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
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
