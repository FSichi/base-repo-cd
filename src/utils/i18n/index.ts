import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import * as en from './en';
import * as es from './es';

const resources = {
    en,
    es,
};

export enum TranslationsKeys {
    NOT_FOUND_PAGE = 'notFoundPage',
    TEST = 'test',
    COMMON = 'common',
    AUTH = 'auth',
}

i18n.use(detector)
    .use(initReactI18next)
    .init({
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
        returnObjects: true,
        keySeparator: '.',
        ns: Object.keys(en),
        resources,
        lng: 'es', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: 'es',
    });

export default i18n;
