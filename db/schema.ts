import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
  primaryKey,
  foreignKey,
  unique,
  check,
  boolean,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import type { AdapterAccountType } from "@auth/core/adapters";
import { sql } from "drizzle-orm";

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

export const accounts = pgTable("account", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userID")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  session_state: boolean("session_state"),
});

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userID")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// Companies Table
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  contactNumber: varchar("contact_number", { length: 50 }),
  address: text("address"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Credit Cards Table
export const creditCards = pgTable("credit_cards", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  cardNumber: varchar("card_number", { length: 20 }).notNull(),
  cardholderName: varchar("cardholder_name", { length: 255 }),
  expiryDate: varchar("expiry_date", { length: 4 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Invoices Table
export const invoices = pgTable(
  "invoices",
  {
    id: serial("id").primaryKey(),
    invoiceCode: varchar("invoice_code", { length: 10 }).notNull().unique(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    issuedAt: timestamp("issued_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    invoiceCodeFormat: check(
      "invoice_code_format",
      sql`substring(${table.invoiceCode} from 1 for 2) = 'GL'`
    ),
  })
);

export const invoiceServices = pgTable("invoice_services", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Sales Table
export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),
  employeeId: integer("employee_id").notNull(),
  saleDate: timestamp("sale_date", { withTimezone: true }).defaultNow(),
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
