import type { Metadata } from "next";
import { EB_Garamond, Figtree } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pankaj Gupta Portfolio",
  description: "A responsive Next.js portfolio website built with Tailwind CSS v4.",
  openGraph: {
    title: "Pankaj Gupta Portfolio",
    description: "A responsive Next.js portfolio website built with Tailwind CSS v4.",
    url: "https://project-01-kappa-sandy.vercel.app",
    siteName: "Pankaj Gupta Portfolio",
    images: [
      {
        url: "https://project-01-kappa-sandy.vercel.app/og-image.jpg",
        width: 1200,
        height: 800,
        alt: "Pankaj Gupta | Product Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Gupta Portfolio",
    description: "A responsive Next.js portfolio website built with Tailwind CSS v4.",
    images: ["https://project-01-kappa-sandy.vercel.app/og-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${ebGaramond.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
