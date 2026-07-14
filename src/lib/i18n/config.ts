import csCommon from '@/locales/cs/common.json';
import csContact from '@/locales/cs/contact.json';
import csForm from '@/locales/cs/form.json';
import skCommon from '@/locales/sk/common.json';
import skContact from '@/locales/sk/contact.json';
import skForm from '@/locales/sk/form.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  sk: {
    common: skCommon,
    form: skForm,
    contact: skContact,
  },
  cs: {
    common: csCommon,
    form: csForm,
    contact: csContact,
  },
};

if (!i18n.isInitialized) {
  i18n.use(LanguageDetector).init({
    resources,
    fallbackLng: 'sk',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
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
