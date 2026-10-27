import type { Metadata } from "next";
import { Archivo, Barlow } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-archivo", display: "swap" });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-barlow", display: "swap" });

export const metadata: Metadata = {
  title: "MALFUNCTION 2026 Hackathon | iDE.A",
  description: "MALFUNCTION 2026 hackathon on 21 November at i-Academy, Filinvest Cebu Cyberzone Tower 2. Register your team.",
  icons: { icon: "/idea-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
