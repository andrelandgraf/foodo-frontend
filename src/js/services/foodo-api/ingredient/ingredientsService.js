import { getRequest } from '../httpService';
import { ENDPOINTS } from '../api';

export const getIngredients = () => getRequest( ENDPOINTS.INGREDIENT );

export const getIngredientsByGroup = group => getRequest( `${ ENDPOINTS.INGREDIENT_BY_GROUP }/${ group }` );

export const getIngredient = id => getRequest( `${ ENDPOINTS.INGREDIENT }/${ id }` );
