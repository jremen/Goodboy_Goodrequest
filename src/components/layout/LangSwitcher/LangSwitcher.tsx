"use client";

import { CountryCodeSelect } from "@/components/ui/PhoneInput/CountryCodeSelect";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function LangSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <CountryCodeSelect
      name="lang-prefix"
      value={i18n.language}
      langSelect
      onChange={(val) => i18n.changeLanguage(val)}
      ariaLabel={t("langSwitcher.label")}
    />
  );
}
