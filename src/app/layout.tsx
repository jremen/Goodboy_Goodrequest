import { getServerLanguage, getServerT } from "@/lib/i18n/serverLocale";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./styles";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();

  return {
    title: t("metadata.site.title"),
    description: t("metadata.site.description"),
    openGraph: {
      title: t("metadata.site.title"),
      description: t("metadata.site.description"),
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
}

export const viewport: Viewport = {
  themeColor: "#4F46E5",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getServerLanguage();

  return (
    <html lang={lang} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
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
