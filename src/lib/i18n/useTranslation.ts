'use client';

import { useCallback, useSyncExternalStore } from 'react';
import i18n from './config';

function subscribe(callback: () => void) {
  i18n.on('languageChanged', callback);
  return () => {
    i18n.off('languageChanged', callback);
  };
}

function getSnapshot() {
  return i18n.language;
}

function getServerSnapshot() {
  return 'sk';
}

export function useTranslation(ns?: string | string[]) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const t = useCallback(
    (key: string, options?: Record<string, unknown>) => {
      return i18n.t(key, { ns, lng: language, ...options }) as string;
    },
    [language, ns],
  );

  return { t, i18n, language };
}
