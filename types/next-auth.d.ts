import { email } from "./../node_modules/zod/src/v4/core/regexes";
import NextAuth from "next-auth";

type UserRole = "admin" | "staff";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//     };
//   }

//   interface User {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//     };
//   }

//   interface JWT {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//     };
//   }
// }

// createUser: async (user: AdapterUser): Promise<AdapterUser> => {
//   const created = await db.insert(users).values(user).returning();
//   return created[0]; // Ensure this matches AdapterUser shape
// };

import NextAuth from "next-auth";
type UserData = {
  id: string;
  email: email;
  role?: string;
  firstname?: string | null;
  lastname?: string | null;
  image?: string | null;
};

declare module "@auth/core/types" {
  interface AdapterUser {
    id: number;
    firstname?: string | null;
    lastname?: string | null;
    email: string;
    role?: string;
  }
}
// id: number; email: string; role: "admin" | "staff" | null; password: string; firstname: string | null; lastname: string | null; secretcode: string | null; image: string | null; createdAt: Date | null; updatedAt: Date | null;
//  email: string | SQL<unknown> | Placeholder<string, any>; password: string | SQL<unknown> | Placeholder<string, any>; role?: "admin" | "staff"

declare module "next-auth" {
  interface User {
    id: string;
    email: email;
    role?: string;
    firstname?: string | null;
    lastname?: string | null;
    image?: string | null;
  }

  // interface Session {
  //   user: UserData & DefaultSession["staff"];
  // }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
