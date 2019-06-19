import { isDevelopment } from '../../utilities/env';

export const API = isDevelopment ? 'http://localhost:3333/' : process.env.REACT_APP_BACKEND_API;
export const ENDPOINTS = {
    AUTHENTICATE: 'auth/token',
    AUTHORIZE: 'auth/authorize',
    REGISTER: 'auth/register',
    PASSWORD: 'auth/password',
    USER: 'user',
    USER_ENDPOINTS: {
        ME: '/me',
        GOAL: '/goal',
        LIFESTYLE: '/lifestyle',
        DISLIKE: '/dislike',
        ALLERGY: '/allergy',
        LOCALE: '/locale',
        RECIPES: '/recipe',
        RECIPE: '/recipe/',
    },
    GOAL: 'goal',
    LIFESTYLE: 'lifestyle',
    ALLERGY: 'allergy',
    RECIPE: 'recipe',
    INGREDIENT: 'ingredient',
    GROUP: 'category',
    INGREDIENT_BY_GROUP: 'ingredient/group/',
};
