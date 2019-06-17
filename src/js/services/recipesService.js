/* eslint-disable import/prefer-default-export */
import { getRequest, postRequest } from './httpService';

const RECIPES_ENDPOINT = 'recipe';

export const getRecipes = () => getRequest( RECIPES_ENDPOINT );

export const postRecipe = recipe => postRequest( RECIPES_ENDPOINT, { recipe } );
