import { db } from "@/db";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { companyName, companyEmail, companyContact } = await req.json();

  if (!companyName || !companyEmail || !companyContact) {
    return NextResponse.json(
      {
        error: "No-Data inserted",
      },
      { status: 400 }
    );
  }

  try {
    const isCompanyDb = await db
      .select()
      .from(companies)
      .where(eq(companies.email, companyEmail));

    if (isCompanyDb.length < 1) {
      await db.insert(companies).values({
        name: companyName,
        email: companyEmail,
        contactNumber: companyContact,
      });
    } else {
      throw new Error("Company Email Alredy Exist - Edit or Add new Email");
    }

    return NextResponse.json(
      {
        msg: "inserted the data successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: `${error}`,
      },
      { status: 500 }
    );
  }
}
