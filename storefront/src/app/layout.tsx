import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Momo & Cia | Moda que Transforma",
  description:
    "Moda feminina com edicoes limitadas, elegancia acessivel e pecas pensadas para revelar a melhor essencia de cada mulher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${notoSerif.variable} ${manrope.variable} min-h-screen bg-brand-cream text-brand-text antialiased`}
      >
        <SiteHeader />
        <main className="pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
