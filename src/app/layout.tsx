import { ColorSchemeScript } from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoodBoy - Pomôžte psíkom v núdzi",
  description:
    "Podporte slovenské psie útulky prostredníctvom nadácie GoodBoy.",
  openGraph: {
    title: "GoodBoy - Pomôžte psíkom v núdzi",
    description:
      "Podporte slovenské psie útulky prostredníctvom nadácie GoodBoy.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        <Providers>
          <main id="main-content" className="">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
