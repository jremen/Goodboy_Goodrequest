"use client";

import { CountryCodeSelect } from "@/components/ui/PhoneInput/CountryCodeSelect";
import { setLocale } from "@/i18n/localeActions";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition, type RefObject } from "react";

export function LangSwitcher({
  listboxRef,
}: {
  listboxRef?: RefObject<HTMLUListElement | null>;
}) {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleChange = async (val: string) => {
    if (val === locale) return;
    await setLocale(val as "sk" | "cs");
    startTransition(() => router.refresh());
  };

  return (
    <CountryCodeSelect
      name="lang-prefix"
      value={locale}
      langSelect
      onChange={handleChange}
      ariaLabel={t("langSwitcher.label")}
      menuRef={listboxRef}
    />
  );
}
