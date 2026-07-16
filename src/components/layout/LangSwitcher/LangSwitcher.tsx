"use client";

import { CountryCodeSelect } from "@/components/ui/PhoneInput/CountryCodeSelect";
import { useServerLang } from "@/lib/i18n/ServerI18n";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useEffect, useState } from "react";

export function LangSwitcher() {
  const { t, i18n } = useTranslation();
  const serverLang = useServerLang();
  const [value, setValue] = useState(serverLang ?? i18n.language);

  useEffect(() => {
    if (i18n.language && i18n.language !== value) {
      setValue(i18n.language);
    }
  }, [i18n.language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CountryCodeSelect
      name="lang-prefix"
      value={value}
      langSelect
      onChange={(val) => i18n.changeLanguage(val)}
      ariaLabel={t("langSwitcher.label")}
    />
  );
}
