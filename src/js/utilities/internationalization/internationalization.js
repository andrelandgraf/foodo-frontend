import i18n from 'i18next';

import { languageStrings } from './languages/index';

export const LOCALES = {
    ENGLISH_LOCALE: 'en',
    GERMAN_LOCALE: 'de',
};

export const KEYS = {
    HEADERS: {
        HOME_WELCOME: 'HOME_WELCOME',
        PROFILE_TITLE: 'PROFILE_TITLE',
        PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
        THIRD_PARTY_AUTHORIZATION: 'THIRD_PARTY_AUTHORIZATION',
    },
    LABELS: {
        APP_NAME: 'APP_NAME',
        HOME: 'HOME',
        MY_PROFILE: 'MY_PROFILE',
        USERNAME: 'USERNAME',
        PASSWORD: 'PASSWORD',
        PREFERENCES: 'PREFERENCES',
        LANGUAGES: 'LANGUAGES',
        LANGUAGE: 'LANGUAGE',
        REGISTRATION: 'REGISTRATION',
        REGISTER: 'REGISTER',
        LOGIN: 'LOGIN',
        LOGOUT: 'LOGOUT',
        AUTHORIZE: 'AUTHORIZE',
        ERROR: 'ERROR',
        WARNING: 'WARNING',
        SUCCESS: 'SUCCESS',
        INFO: 'INFO',
    },
    MESSAGES: {
        USERNAME_WARNING: 'USERNAME_WARNING',
        PASSWORD_WARNING: 'PASSWORD_WARNING',
        PAGE_NOT_FOUND_MESSAGE: 'PAGE_NOT_FOUND_MESSAGE',
        WRONG_CREDENTIALS_ERR: 'WRONG_CREDENTIALS_ERR',
        NOT_AUTHORIZED_ERR: 'NOT_AUTHORIZED_ERR',
        SERVER_NOT_REACHABLE_ERR: 'SERVER_NOT_REACHABLE_ERR',
        USERNAME_ALREADY_TAKEN_ERR: 'USERNAME_ALREADY_TAKEN_ERR',
        REQUEST_PARAMS_MISSING_ERR: 'REQUEST_PARAMS_MISSING_ERR',
    },
};

function getBrowserLang() {
    let lang = navigator.languages ? navigator.languages[ 0 ] : navigator.language;
    if ( lang.length > 2 ) { lang = lang.slice( 3 ); }
    return lang.toLowerCase();
}

const browserLang = getBrowserLang();
const isValid = Object.keys( LOCALES ).find( LOCALE => LOCALES[ LOCALE ] === browserLang );
export const DEFAULT_LOCALE = isValid ? browserLang : LOCALES.ENGLISH_LOCALE;

export const getLocale = () => {
    const { locale } = window.localStorage;
    if ( !locale ) {
        return DEFAULT_LOCALE;
    }
    return locale;
};

// Gets the locale and initializes i18next.
const initLocalizationClient = async () => i18n.init( {
    lng: getLocale(),
    resources: languageStrings,
} );

export const setLocale = async ( locale ) => {
    window.localStorage.locale = locale;
    await i18n.changeLanguage( locale );
};

export const localizationClientt = initLocalizationClient();
