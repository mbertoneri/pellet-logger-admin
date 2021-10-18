import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// noinspection JSIgnoredPromiseFromCall
i18next
    .use(Backend)
    .use(intervalPlural)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/translations/{{lng}}/{{ns}}.json',
        },
        debug: process.env.NODE_ENV !== 'production',
        lng: 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
        returnObjects: false,
        returnedObjectHandler: (key, value, options) => console.log(key, value, options),
    });

export default i18next;
