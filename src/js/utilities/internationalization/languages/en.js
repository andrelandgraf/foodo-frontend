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
    COOKING_HEADER: 'Cooking Details Page',
    SELECT_RECIPE: 'What do you want to cook today?',
    SELECT_SUBSTITUTE: 'Substitute {{ingredient}}',
    ALLERGIES_SELECTION: 'Your allergies',
    DISLIKES_SELECTION: 'Your dislikes',
    GOALS_SELECTION: 'Your personal goal',
    LIFESTYLES_SELECTION: 'Your lifestyle',
    PAGE_NOT_FOUND: 'Page not found!',
    CHANGE_PW: 'Change $t(PASSWORD)',
    THIRD_PARTY_AUTHORIZATION: 'Third party service authorization',
};

// short labels (e.g. button text, navbar text, input placehodlers, ...)
const enLabels = {
    APP_NAME: 'Foodo',
    HOME: 'Home',
    MY_PROFILE: 'My Profile',
    PROFILE: 'Profile',
    SELECT_RECIPE_PLACEHOLDER: 'Select your recipe...',
    ALLERGIES_PLACEHOLDER: 'Select your allergies...',
    DISLIKES_PLACEHOLDER: 'Select your dislikes...',
    GOALS_PLACEHOLDER: 'Select your personal goals...',
    LIFESTYLES_PLACEHOLDER: 'Select your lifestyle...',
    INGREDIENTS: 'Ingredients',
    NUTRITION: 'Nutritional Facts',
    EDITED_WITH: 'Recipe edited with',
    USERNAME: 'Username',
    PASSWORD: 'Password',
    CHANGE: 'Change',
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
    PASSWORD_CHANGED: '$t(PASSWORD) changed successfully.',
    GO_TO_PROFILE_1: 'Go to your ',
    GO_TO_PROFILE_2: ' and select a personal nutrition goal.',
    PAGE_NOT_FOUND_MESSAGE: 'We are sorry, the Page you are looking for, doesn\'t exist.',
    WRONG_CREDENTIALS_ERR: '$t(ERROR), wrong $t(USERNAME) or password, please try again.',
    NOT_AUTHORIZED_ERR: '$t(ERROR), you are not authorized to access this page.',
    SERVER_NOT_REACHABLE_ERR: '$t(ERROR), unable to connect to server, please check your internet connection.',
    USERNAME_ALREADY_TAKEN_ERR: '$t(ERROR), the username is already in use, please pick another one.',
    REQUEST_PARAMS_MISSING_ERR: '$t(ERROR), request parameters are missing, please contact the support team.',
    SUBSTITUTION_SUCCESS: 'Congratulations! There is nothing more to substitute. Your personalized recipe is finshied!',

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
