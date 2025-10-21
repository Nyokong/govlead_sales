import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import authConfig from "@/lib/authConfig";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

// export { auth as middleware } from "@/auth";

export default auth(async function middleware(_request: NextRequest) {
  try {
    // your logic
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|_next/internal|favicon.ico|sitemap.xml|robots.txt|file.svg|window.svg|globe.svg|favicon.ico:path*).*)",
    "/((?!checkout).*)",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/_next/internal",
    "/_next/internal/helpers.ts",
  ],
};
