import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Momo & Cia | Curadoria Contemporanea",
  description:
    "Moda feminina com curadoria editorial, pecas limitadas e uma vitrine conectada ao catalogo real da Momo & Cia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${newsreader.variable} ${inter.variable} min-h-screen bg-brand-background text-brand-surface antialiased`}
      >
        <SiteHeader />
        <main className="pt-28 pb-16 md:pt-32">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
