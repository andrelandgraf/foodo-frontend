import { getRequest } from '../httpService';
import { ENDPOINTS } from '../api';

export const getIngredients = () => getRequest( ENDPOINTS.INGREDIENTS );

export const getIngredientsByGroup = group => getRequest( `${ ENDPOINTS.INGREDIENT_BY_GROUPS }/${ group }` );

export const getIngredient = id => getRequest( `${ ENDPOINTS.INGREDIENTS }/${ id }` );

export const getIngredientCategories = () => getRequest( ENDPOINTS.CATEGORIES );
