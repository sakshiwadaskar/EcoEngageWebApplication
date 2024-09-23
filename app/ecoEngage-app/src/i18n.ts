import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';

const languageFromStorage = localStorage.getItem('language');
const defaultLanguage = languageFromStorage || 'en';

const i18nInstance = i18n.createInstance();

i18nInstance.use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: 'en',
    ns: ['common'],
    backend: {
      loadPath: '/i18n/{{lng}}/{{ns}}.json'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18nInstance;
