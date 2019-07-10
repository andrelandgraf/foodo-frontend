// German translations, for more information about the structure, see en.js

const deHeaders = {
    HOME_WELCOME: 'Willkommen bei $t(APP_NAME), {{name}}!',
    PROFILE_TITLE: 'Dein persönliches Profil',
    COOKING_HEADER: 'Kochen Kochen Kochen!',
    SELECT_RECIPE: 'Was willst du heute kochen?',
    SELECT_SUBSTITUTE: 'Substituiere {{ingredient}}',
    ALLERGIES_SELECTION: 'Deine Allergien',
    DISLIKES_SELECTION: 'Deine Dislikes',
    GOALS_SELECTION: 'Dein persönliches Ziel',
    LIFESTYLES_SELECTION: 'Dein Lifestyle',
    STATISTICS: 'Deine Statistik',
    PAGE_NOT_FOUND: 'Seite nicht gefunden!',
    CHANGE_PW: 'Ändere dein $t(PASSWORD)',
    THIRD_PARTY_AUTHORIZATION: 'Login mit Alexa',
};

const deLabels = {
    APP_NAME: 'Foodo',
    HOME: 'Home',
    MY_PROFILE: 'Mein Profil',
    PROFILE: 'Profil',
    ABOUT: 'Über uns',
    SELECT_RECIPE_PLACEHOLDER: 'Such dir ein Rezept aus...',
    ALLERGIES_PLACEHOLDER: 'Wähle deine Allergien...',
    DISLIKES_PLACEHOLDER: 'Wähle, was dir nicht schmeckt...',
    GOALS_PLACEHOLDER: 'Wähle dein Ziel aus...',
    LIFESTYLES_PLACEHOLDER: 'Wähle deinen Lifestyle...',
    INGREDIENTS: 'Zutaten',
    NUTRITION: 'Nährwerte',
    EDITED_WITH: 'Rezept bearbeitet mit',
    USERNAME: 'Benutzername',
    PASSWORD: 'Passwort',
    CHANGE: 'Ändern',
    NONE: 'Keine',
    NOT: 'Nicht',
    CONTAINS: 'Enthält',
    PREFERENCES: 'Präferenzen',
    YOUR_FAVORITES: 'Deine Favoriten',
    BREAKFAST: 'Frühstück',
    LUNCH: 'Mittagsessen',
    DINNER: 'Abendessen',
    TOLERATED_RECIPES: 'Verträgliche Rezepte',
    STATISTICS: 'Statistik',
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
    PASSWORD_CHANGED: '$t(PASSWORD) wurde erfolgreich geändert.',
    GO_TO_PROFILE_1: 'Geh zu deinem ',
    GO_TO_PROFILE_2: ' und wähle dein persönliches Ernährungsziel.',
    PAGE_NOT_FOUND_MESSAGE: 'Es tut uns Leid, die gesuchte Seite existiert nicht.',
    WRONG_CREDENTIALS_ERR: '$t(ERROR), falscher $t(USERNAME) or falsches Passwort, bitte versuche es erneut.',
    NOT_AUTHORIZED_ERR: '$t(ERROR), du bist nicht authorisiert diesen Bereich zu betreten.',
    SERVER_NOT_REACHABLE_ERR: '$t(ERROR), der Server ist nicht erreichbar, bitte überprüfe deine Internetverbindung.',
    USERNAME_ALREADY_TAKEN_ERR: '$t(ERROR), der $t(USERNAME) wird schon benutzt, bitte nutze einen Anderen.',
    REQUEST_PARAMS_MISSING_ERR: '$t(ERROR), benötigte Request Parameter fehlen, bitte wenden Sie sich an den Support.',
    SUBSTITUTION_SUCCESS: 'Gratuliere, es gibt nichts weiter zu substituieren, dein persönliches Rezept ist fertig!',
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
