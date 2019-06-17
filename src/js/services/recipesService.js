/* eslint-disable import/prefer-default-export */
import { getRequest } from './httpService';

const RECIPES_ENDPOINT = 'recipe';

export const getRecipes = () => getRequest( RECIPES_ENDPOINT );
