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
        COOKING_HEADER: 'COOKING_HEADER',
        SELECT_RECIPE: 'SELECT_RECIPE',
        SELECT_SUBSTITUTE: 'SELECT_SUBSTITUTE',
        ALLERGIES_SELECTION: 'ALLERGIES_SELECTION',
        DISLIKES_SELECTION: 'DISLIKES_SELECTION',
        GOALS_SELECTION: 'GOALS_SELECTION',
        LIFESTYLES_SELECTION: 'LIFESTYLES_SELECTION',
        STATISTICS: 'STATISTICS',
        PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
        CHANGE_PW: 'CHANGE_PW',
        THIRD_PARTY_AUTHORIZATION: 'THIRD_PARTY_AUTHORIZATION',
        GOTO_FOODO: 'GOTO_FOODO',
        GET_STARTED: 'GET_STARTED',
        PAGE2_TITLE: 'PAGE2_TITLE',
        PAGE2_LABEL1: 'PAGE2_LABEL1',
        PAGE2_LABEL2: 'PAGE2_LABEL2',
        PAGE2_LABEL3: 'PAGE2_LABEL3',
        PAGE2_INFO: 'PAGE2_INFO',
        PAGE2_TEASER: 'PAGE2_TEASER',
        START_NOW: 'START_NOW',
        SUBSCRIBE: 'SUBSCRIBE',
    },
    LABELS: {
        APP_NAME: 'APP_NAME',
        HOME: 'HOME',
        MY_PROFILE: 'MY_PROFILE',
        PROFILE: 'PROFILE',
        ABOUT: 'ABOUT',
        SELECT_RECIPE_PLACEHOLDER: 'SELECT_RECIPE_PLACEHOLDER',
        ALLERGIES_PLACEHOLDER: 'ALLERGIES_PLACEHOLDER',
        DISLIKES_PLACEHOLDER: 'DISLIKES_PLACEHOLDER',
        GOALS_PLACEHOLDER: 'GOALS_PLACEHOLDER',
        LIFESTYLES_PLACEHOLDER: 'LIFESTYLES_PLACEHOLDER',
        GOAL_PITCH: 'GOAL_PITCH',
        LIFESTYLE_PITCH: 'LIFESTYLE_PITCH',
        ALLERGIES_PITCH: 'ALLERGIES_PITCH',
        MANUAL_PITCH_START: 'MANUAL_PITCH_START',
        MANUAL_PITCH_ALTER: 'MANUAL_PITCH_ALTER',
        MANUAL_PITCH_SUBSTITUTE: 'MANUAL_PITCH_SUBSTITUTE',
        INGREDIENTS: 'INGREDIENTS',
        NUTRITION: 'NUTRITION',
        EDITED_WITH: 'EDITED_WITH',
        USERNAME: 'USERNAME',
        PASSWORD: 'PASSWORD',
        CHANGE: 'CHANGE',
        NONE: 'NONE',
        NOT: 'NOT',
        CONTAINS: 'CONTAINS',
        NAVIGATION: 'NAVIGATION',
        PREFERENCES: 'PREFERENCES',
        YOUR_FAVORITES: 'YOUR_FAVORITES',
        BREAKFAST: 'BREAKFAST',
        LUNCH: 'LUNCH',
        DINNER: 'DINNER',
        TOLERATED_RECIPES: 'TOLERATED_RECIPES',
        STATISTICS: 'STATISTICS',
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
        PASSWORD_CHANGED: 'PASSWORD_CHANGED',
        GO_TO_PROFILE_1: 'GO_TO_PROFILE_1',
        GO_TO_PROFILE_2: 'GO_TO_PROFILE_2',
        PAGE_NOT_FOUND_MESSAGE: 'PAGE_NOT_FOUND_MESSAGE',
        WRONG_CREDENTIALS_ERR: 'WRONG_CREDENTIALS_ERR',
        NOT_AUTHORIZED_ERR: 'NOT_AUTHORIZED_ERR',
        SERVER_NOT_REACHABLE_ERR: 'SERVER_NOT_REACHABLE_ERR',
        USERNAME_ALREADY_TAKEN_ERR: 'USERNAME_ALREADY_TAKEN_ERR',
        REQUEST_PARAMS_MISSING_ERR: 'REQUEST_PARAMS_MISSING_ERR',
        SUBSTITUTION_SUCCESS: 'SUBSTITUTION_SUCCESS',
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
