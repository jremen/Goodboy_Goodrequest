import { getTranslations } from "next-intl/server";

import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");

  return {
    title: t("metadata.contact.title"),
    description: t("metadata.contact.description"),
    openGraph: {
      title: t("metadata.contact.title"),
      description: t("metadata.contact.description"),
    },
  };
}

export default async function Contact() {
  return <ContactPage />;
}
