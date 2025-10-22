import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import type { AdapterAccountType } from "@auth/core/adapters";

const id = nanoid();

export const users = pgTable("users", {
  id: text("uID")
    .primaryKey()
    .$defaultFn(() => id),
  firstname: text("firstname"),
  lastname: text("lastname"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "staff">().notNull(),
  secretcode: text("secretcode"),
  image: text("image"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// export const sessionTable = pgTable("session", {
//   sessionToken: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//   userId: text("uID")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// });

export const accounts = pgTable(
  "account",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("userID")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    session_state: boolean("session_state"),
  }
  // (account) => [
  //   {
  //     compoundKey: primaryKey({
  //       columns: [account.provider, account.providerAccountId],
  //     }),
  //   },
  // ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userID")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// export const verificationTokens = pgTable(
//   "verificationToken",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (verificationToken) => [
//     {
//       compositePk: primaryKey({
//         columns: [verificationToken.identifier, verificationToken.token],
//       }),
//     },
//   ]
// );

// export const authenticators = pgTable(
//   "authenticator",
//   {
//     credentialID: text("credentialID").notNull().unique(),
//     userId: text("userID")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     providerAccountId: text("providerAccountId").notNull(),
//     credentialPublicKey: text("credentialPublicKey").notNull(),
//     counter: integer("counter").notNull(),
//     credentialDeviceType: text("credentialDeviceType").notNull(),
//     credentialBackedUp: boolean("credentialBackedUp").notNull(),
//     transports: text("transports"),
//   },
//   (authenticator) => [
//     {
//       compositePK: primaryKey({
//         columns: [authenticator.userId, authenticator.credentialID],
//       }),
//     },
//   ]
// );
