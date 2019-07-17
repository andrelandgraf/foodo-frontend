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
    GOTO_FOODO: 'Gehe zu Foodo',
    GET_STARTED: 'Jetzt loslegen',
    PAGE2_TITLE: 'ist dein',
    PAGE2_LABEL1: 'Gefährte',
    PAGE2_LABEL2: 'Ernährungsexperte',
    PAGE2_LABEL3: 'Sam zu deinem Frodo',
    PAGE2_INFO: 'Wir werden die am besten passenden Substitute für deine täglich gekochten Mahlzeiten berechnen.',
    PAGE2_TEASER: 'Finde heraus wie!',
    START_NOW: 'Probiere es jetzt!',
    SUBSCRIBE: 'Subscribe',
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
    GOAL_PITCH: 'Wähle dein persönliches Ziel',
    LIFESTYLE_PITCH: 'Wähle deinen individuellen Lifestyle',
    ALLERGIES_PITCH: 'Wähle deine Allergien und Abneigungen',
    MANUAL_PITCH_START: 'Wähle ein Gericht aus, welches du kochen möchtest',
    MANUAL_PITCH_ALTER: 'Schau dir das Rezept an und ändere es nach deinem Wunsch',
    MANUAL_PITCH_SUBSTITUTE: 'Wir werden dir helfen ungesunde Bestandteile zu substituieren',
    INGREDIENTS: 'Zutaten',
    CURRENT_NUTRISCORE: 'Aktueller NutriScore:',
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
