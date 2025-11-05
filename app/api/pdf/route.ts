// app/api/pdf/route.ts
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import Pdfdownload from "@/components/reuseables/pdf/invoicedoc";

export async function POST(req: Request) {
  try {
    const { html } = await req.json();

    if (!html || typeof html !== "string") {
      return new NextResponse("Invalid HTML input", { status: 400 });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=invoice.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}
