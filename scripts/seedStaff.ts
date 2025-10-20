import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

const db = drizzle(`${process.env.DATABASE_URL!}`);

const staffAccounts = [
  {
    firstname: "Shadrack",
    lastname: "Mogwasi",
    email: "shadrack@govleadgroup.co.za",
    password: "Shadrack@000",
    secretcode: "sm1020",
  },
  {
    firstname: "Boipelo Innocentia",
    lastname: "Solwane",
    email: "boipelo@govleadgroup.co.za",
    password: "Boipelo@000",
    secretcode: "bs1450",
  },
  {
    firstname: "Kelebogile Comfort",
    lastname: "Montsho",
    email: "Comfort@govleadgroup.co.za",
    password: "Kelebogile@000",
    secretcode: "km1098",
  },
  {
    firstname: "Gift",
    lastname: "Kgomo",
    email: "Gift@govleadgroup.co.za",
    password: "Gift@000",
    secretcode: "gk1090",
  },
  {
    firstname: "Govern",
    lastname: "Skosana",
    email: "Govern@govleadgroup.co.za",
    password: "Govern@000",
    secretcode: "gs1310",
  },
  {
    firstname: "Zanele",
    lastname: "Tyobela",
    email: "Zanele@govleadgroup.co.za",
    password: "Zanele@000",
    secretcode: "zt1763",
  },
  {
    firstname: "Tshegofatso",
    lastname: "Molale",
    email: "Tshego@govleadgroup.co.za",
    password: "Tshegofatso@000",
    secretcode: "tm2987",
  },
];

async function seedStaff() {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, "Tshego@govleadgroup.co.za"));
  if (existing.length === 0) {
    // if nothing hash the password
    staffAccounts.map(async (entry) => {
      const hash = await bcrypt.hash(`${entry.password}`, 10);
      await db.insert(users).values({
        firstname: `${entry.firstname}`,
        lastname: `${entry.lastname}`,
        email: `${entry.email}`,
        role: "staff",
        password: `${hash}`,
        secretcode: `${entry.secretcode}`,
      });
    });

    console.log("Staff seeded");
  } else {
    console.log("Staff already exists");
  }
}

seedStaff().catch((err) => {
  console.error("❌ Seeding Staff failed:", err);
  process.exit(1);
});
