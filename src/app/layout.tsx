import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoDeva = Noto_Sans_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bajkamal Singh — Baaz // Creative Director",
  description:
    "Bajkamal Singh AKA Baaz — SRCC '27, Delhi. Creative by night, more creative by midnight. Artist manager, brand strategist, creative director. 186M+ views driven.",
  keywords: [
    "Bajkamal Singh",
    "Baaz",
    "Creative Director",
    "SRCC",
    "Delhi",
    "Portfolio",
    "Brand Strategy",
    "Artist Management",
  ],
  authors: [{ name: "Bajkamal Singh" }],
  openGraph: {
    title: "Bajkamal Singh — Baaz // Creative Director",
    description:
      "Creative by night, more creative by midnight. SRCC '27 · Delhi, India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable} ${notoDeva.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
