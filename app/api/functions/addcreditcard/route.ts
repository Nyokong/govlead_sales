import { db } from "@/db";
import { companies, creditCards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    companyEmail,
    creditCardNumb,
    cardHolder,
    expDate,
    paymentFrequency,
  } = await req.json();

  console.log(
    typeof creditCardNumb,
    typeof companyEmail,
    typeof cardHolder,
    typeof expDate,
    typeof paymentFrequency
  );

  if (
    !creditCardNumb ||
    !companyEmail ||
    !cardHolder ||
    !expDate ||
    !paymentFrequency
  ) {
    return NextResponse.json(
      {
        error: "No-Data inserted",
      },
      { status: 400 }
    );
  } else {
    try {
      const isCompanyDb = await db
        .select({ id: companies.id })
        .from(companies)
        .where(eq(companies.email, companyEmail))
        .limit(1);

      //   console.log(isCompanyDb[0]);

      if (isCompanyDb.length > 0) {
        // const exp = new Date()

        await db.insert(creditCards).values({
          companyId: isCompanyDb[0].id,
          cardNumber: creditCardNumb,
          cardholderName: cardHolder,
          expiryDate: expDate,
          paymentMethod: paymentFrequency,
        });
      } else {
        throw new Error("Email Doesnt Exist | Something Went Wrong!");
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
}
