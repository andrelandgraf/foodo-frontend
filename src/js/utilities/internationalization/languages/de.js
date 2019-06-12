// German translations, for more information about the structure, see en.js

const deHeaders = {
    HOME_WELCOME: 'Willkommen bei $t(APP_NAME), {{name}}!',
    PROFILE_TITLE: 'Dein persönliches Profil',
    PAGE_NOT_FOUND: 'Seite nicht gefunden!',
    THIRD_PARTY_AUTHORIZATION: 'Drittanbieter Autorisierung',
};

const deLabels = {
    APP_NAME: 'React App',
    HOME: 'Home',
    MY_PROFILE: 'Mein Profil',
    USERNAME: 'Benutzername',
    PASSWORD: 'Passwort',
    PREFERENCES: 'Präferenzen',
    LANGUAGES: 'Sprachen',
    LANGUAGE: 'Sprache',
    REGISTRATION: '$t(REGISTER)',
    REGISTER: 'Registrieren',
    LOGIN: 'Log-In',
    LOGOUT: 'Ausloggen',
    AUTHORIZE: 'Autorisieren',
    ERROR: 'Error',
    WARNING: 'Warnung',
    SUCCESS: 'Erfolg',
    INFO: 'Info',
};

const deMessages = {
    USERNAME_WARNING: '$t(USERNAME) muss mindestens aus zwei Zeichen bestehen!',
    PASSWORD_WARNING: '$t(PASSWORD) muss angegeben werden!',
    PAGE_NOT_FOUND_MESSAGE: 'Es tut uns Leid, die gesuchte Seite existiert nicht.',
    WRONG_CREDENTIALS_ERR: '$t(ERROR), falscher $t(USERNAME) or falsches Passwort, bitte versuche es erneut.',
    NOT_AUTHORIZED_ERR: '$t(ERROR), du bist nicht authorisiert diesen Bereich zu betreten.',
    SERVER_NOT_REACHABLE_ERR: '$t(ERROR), der Server ist nicht erreichbar, bitte überprüfe deine Internetverbindung.',
    USERNAME_ALREADY_TAKEN_ERR: '$t(ERROR), der $t(USERNAME) wird schon benutzt, bitte nutze einen Anderen.',
    REQUEST_PARAMS_MISSING_ERR: '$t(ERROR), benötigte Request Parameter fehlen, bitte wenden Sie sich an den Support.',
};

const deData = {
    translation: {
        ...deHeaders,
        ...deLabels,
        ...deMessages,
    },
};

const dedeLabels = {
    APP_NAME: 'React App',
};

const dedeData = {
    translation: {
        ...dedeLabels,
    },
};

export { deData, dedeData };
