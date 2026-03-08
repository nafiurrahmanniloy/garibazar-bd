import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "GariBazar BD — গাড়িবাজার | Used Cars in Bangladesh",
  description:
    "Bangladesh's trusted marketplace for pre-owned cars. Find verified second-hand Toyota, Honda, Nissan, and more across Dhaka, Chittagong, Sylhet.",
  keywords: [
    "used cars bangladesh",
    "second hand car dhaka",
    "reconditioned car bd",
    "garibazar",
    "গাড়িবাজার",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
