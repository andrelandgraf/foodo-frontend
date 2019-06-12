/**
 * English translations
 * => Use this file in combination with the internationalization.js KEYS object in this folder
 * => The enData Object is divided into different other objects
 *    (e.g. Headers, Labels) to improve readabilty
 */

// headers (e.g. title, h1, h2, ...)
const enHeaders = {
    HOME_WELCOME: 'Welcome at $t(APP_NAME), {{name}}!',
    PROFILE_TITLE: 'Your Personal Profile',
    PAGE_NOT_FOUND: 'Page not found!',
    THIRD_PARTY_AUTHORIZATION: 'Third party service authorization',
};

// short labels (e.g. button text, navbar text, input placehodlers, ...)
const enLabels = {
    APP_NAME: 'React App',
    HOME: 'Home',
    MY_PROFILE: 'My Profile',
    USERNAME: 'Username',
    PASSWORD: 'Password',
    PREFERENCES: 'Preferences',
    LANGUAGES: 'Languages',
    LANGUAGE: '$t(LANGUAGES)',
    REGISTRATION: 'Registration',
    REGISTER: 'Register',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    AUTHORIZE: 'Authorize',
    ERROR: 'Error',
    WARNING: 'Warning',
    SUCCESS: 'Success',
    INFO: 'Info',
};

// messages (e.g. message component, warnings, descriptions, ...)
const enMessages = {
    USERNAME_WARNING: '$t(USERNAME) must be longer than 2 characters!',
    PASSWORD_WARNING: '$t(PASSWORD) must be set!',
    PAGE_NOT_FOUND_MESSAGE: 'We are sorry, the Page you are looking for, doesn\'t exist.',
    WRONG_CREDENTIALS_ERR: '$t(ERROR), wrong $t(USERNAME) or password, please try again.',
    NOT_AUTHORIZED_ERR: '$t(ERROR), you are not authorized to access this page.',
    SERVER_NOT_REACHABLE_ERR: '$t(ERROR), unable to connect to server, please check your internet connection.',
    USERNAME_ALREADY_TAKEN_ERR: '$t(ERROR), the username is already in use, please pick another one.',
    REQUEST_PARAMS_MISSING_ERR: '$t(ERROR), request parameters are missing, please contact the support team.',

};

const enData = {
    translation: {
        ...enHeaders,
        ...enLabels,
        ...enMessages,
    },
};

/** following translations overide enData and default back to enData if key is not found */

const enauLabels = {
    APP_NAME: 'React App',
};

const enauData = {
    translation: {
        ...enauLabels,
    },
};

const encaLabels = {
    APP_NAME: 'React App',
};

const encaData = {
    translation: {
        ...encaLabels,
    },
};

const engbLabels = {
    APP_NAME: 'React App',
};

const engbData = {
    translation: {
        ...engbLabels,
    },
};

const eninLabels = {
    APP_NAME: 'React App',
};

const eninData = {
    translation: {
        ...eninLabels,
    },
};

const enusLabels = {
    APP_NAME: 'React App',
};

const enusData = {
    translation: {
        ...enusLabels,
    },
};

export {
    enData,
    enauData,
    encaData,
    engbData,
    eninData,
    enusData,
};
