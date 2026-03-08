import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-[family-name:var(--font-inter)]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
