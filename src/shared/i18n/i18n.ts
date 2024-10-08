// i18nConfig.ts
import i18next from "i18next";
import Backend from "i18next-node-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import path from "path";

const i18nConfig = () => {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      lng: "vi",
      backend: {
        loadPath: path.join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
      },
      fallbackLng: "vi",
      preload: ["vi", "en"],
      load: "languageOnly",
    });
  
  return i18next;
};

export default i18nConfig;
