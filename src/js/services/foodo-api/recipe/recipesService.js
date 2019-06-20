/* eslint-disable import/prefer-default-export */
import { getRequest, postRequest, putRequest } from '../httpService';
import { ENDPOINTS } from '../api';

export const getRecipes = () => getRequest( ENDPOINTS.RECIPE );

export const getRecipe = id => getRequest( `${ ENDPOINTS.RECIPE }/${ id }` );

export const postRecipe = recipe => postRequest( ENDPOINTS.RECIPE, { recipe } );

export const getUserRecipes = () => getRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPES }`,
);

export const getUserRecipe = id => getRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPE }${ id }`,
);

export const postUserRecipe = recipe => postRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPE }`, { recipe },
);

export const updateUserRecipe = recipe => putRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.RECIPE }`, { recipe },
);
