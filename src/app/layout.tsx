import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Inter, Noto_Sans_Devanagari, Caveat } from "next/font/google";
import "./globals.css";

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

// Handwritten display font — the source portfolio's visual language is built
// on hand-rendered typography. Caveat is the closest licensed Google Font
// with narrow, irregular glyph rhythm and oversized heading proportions.
const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pankaj Gupta | Product x AI",
  description:
    "Pankaj Gupta — DTU '23, Delhi. Product Manager, Applied AI builder, researcher.",
  keywords: [
    "Pankaj Gupta",
    "Product Manager",
    "Applied AI",
    "Researcher",
    "DTU",
    "Delhi",
    "Portfolio",
    "Product x AI",
  ],
  authors: [{ name: "Pankaj Gupta" }],
  openGraph: {
    title: "Pankaj Gupta | Product x AI",
    description:
      "Product Manager & Applied AI Builder. DTU '23 · Delhi, India.",
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
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable} ${notoDeva.variable} ${caveat.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
