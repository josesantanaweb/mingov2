'use client';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import en from '@/translations/en.json';
import es from '@/translations/es.json';

type Translations = typeof en;
type SupportedLanguages = 'en' | 'es';

const translations: Record<SupportedLanguages, Translations> = { en, es };

const TranslationContext = createContext<{
  t: (key: keyof Translations) => string;
  setLanguage: (lang: SupportedLanguages) => void;
  language: SupportedLanguages;
}>({
  t: key => key,
  setLanguage: () => {},
  language: 'en',
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguages>('en');

  const t = (key: keyof Translations) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ t, setLanguage, language }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
