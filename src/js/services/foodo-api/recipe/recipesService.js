/* eslint-disable import/prefer-default-export */
import { getRequest, postRequest, putRequest } from '../httpService';
import { ENDPOINTS } from '../api';

export const getRecipes = () => getRequest( ENDPOINTS.RECIPES );

export const getRecipe = id => getRequest( `${ ENDPOINTS.RECIPES }/${ id }` );

export const postRecipe = recipe => postRequest( ENDPOINTS.RECIPES, { recipe } );

export const getUserRecipes = () => getRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPES }`,
);

export const getUserRecipe = id => getRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPES }/${ id }`,
);

export const postUserRecipe = personalizedRecipe => postRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPES }`, { personalizedRecipe },
);

export const updateUserRecipe = personalizedRecipe => putRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPES }`, { personalizedRecipe },
);

export const getRecipeSubstitutes = id => getRequest(
    `${ ENDPOINTS.RECIPES }/${ id }${ ENDPOINTS.RECIPES_ENDPOINTS.SUBSTITUTES }`,
);
