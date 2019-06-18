/* eslint-disable import/prefer-default-export */
import { getRequest, postRequest } from '../httpService';
import { ENDPOINTS } from '../api';

export const getRecipes = () => getRequest( ENDPOINTS.RECIPE );

export const postRecipe = recipe => postRequest( ENDPOINTS.RECIPE, { recipe } );
