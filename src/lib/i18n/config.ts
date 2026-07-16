import csCommon from "@/locales/cs/common.json";
import csForm from "@/locales/cs/form.json";
import csSubpages from "@/locales/cs/subpages.json";
import skCommon from "@/locales/sk/common.json";
import skForm from "@/locales/sk/form.json";
import skSubpages from "@/locales/sk/subpages.json";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  sk: {
    common: skCommon,
    form: skForm,
    subpages: skSubpages,
  },
  cs: {
    common: csCommon,
    form: csForm,
    subpages: csSubpages,
  },
};

if (!i18n.isInitialized) {
  i18n.use(LanguageDetector).init({
    resources,
    fallbackLng: "sk",
    defaultNS: "common",
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;

export function getT(lng?: string) {
  return i18n.getFixedT(lng ?? i18n.language);
}
