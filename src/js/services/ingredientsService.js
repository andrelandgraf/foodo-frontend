import { getRequest } from './httpService';

const INGREDIENTS_ENDPOINT = 'ingredient';
const INGREDIENT_ENDPOINT = 'ingredient/id';

export const getIngredients = () => getRequest( INGREDIENTS_ENDPOINT );

export const getIngredientsByGroup = group => getRequest( `${ INGREDIENTS_ENDPOINT }/${ group }` );

export const getIngredient = id => getRequest( `${ INGREDIENT_ENDPOINT }/${ id }` );
