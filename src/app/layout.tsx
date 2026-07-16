import { InlineScript } from "@/components/ui/InlineScript";
import { mantineHtmlProps } from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import "./styles";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");

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
  const locale = await getLocale();

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <InlineScript
          html={`try{var _c=window.localStorage.getItem("mantine-color-scheme-value");var c=_c==="light"||_c==="dark"||_c==="auto"?_c:"light";var cc=c!=="auto"?c:window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.setAttribute("data-mantine-color-scheme",cc)}catch(e){}`}
        />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        <NextIntlClientProvider>
          <Providers>
            <main id="main-content" className="">
              {children}
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
