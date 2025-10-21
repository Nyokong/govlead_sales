import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { User } from "next-auth";

import { db } from "@/db";

import authConfig from "@/lib/authConfig";

import * as schema from "@/db/schema";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db, schema as any),
  ...authConfig,
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = `${user.role}`;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;

      return session;
    },
    async signIn({ user, account }) {
      if (account?.type === "credentials") {
        console.log("wait is this the sign in adding session");
      }

      return true;
    },
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
});
