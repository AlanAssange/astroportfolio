import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.ts';
import es from './es.ts';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18next;