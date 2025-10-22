import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { MenuProvider } from "@/context/side-menu";
import { ThemeProvider } from "next-themes";
import CustomThemeProvider from "@/context/themeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Govlead Sales App",
  description: "Made by Khotso Nyokong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <SessionProvider>
            <CustomThemeProvider>
              <MenuProvider>{children}</MenuProvider>
            </CustomThemeProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
