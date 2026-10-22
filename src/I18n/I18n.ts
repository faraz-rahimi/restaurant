import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./Locales/en.json";
import fa from "./Locales/fa.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
