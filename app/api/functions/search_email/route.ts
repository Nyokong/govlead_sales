import { db } from "@/db";
import { companies } from "@/db/schema";
import { ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { companyEmail } = await req.json();

  if (!companyEmail || companyEmail.length < 3) {
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
      .where(ilike(companies.email, `%${companyEmail}%`));

    if (!isCompanyDb) {
      console.log(companyEmail);
    }

    return NextResponse.json(
      {
        res: isCompanyDb,
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
