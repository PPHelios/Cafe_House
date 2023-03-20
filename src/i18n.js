import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
//import HttpApi from "i18next-http-backend";
import Backend from "i18next-http-backend";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
// const resources = {
//   en: {
//     translation: {
//       app_name: "Grootbasket",
//     },
//   },
//   ar: {
//     translation: {
//       app_name: "جروتباسكت",
//     },
//   },
// };

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    ns: ["translation", "common", "validation", "glossary"],
    defaultNS: "translation",

    //lng: "en", // Default language will be Arabic and don't use with language detector
    //  resources, // to load resources from const resources locally

    // Allows "en-US" and "en-UK" to be implcitly supported when "en"
    // is supported
    nonExplicitSupportedLngs: true,
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    // debug: true, // show console.log events
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
