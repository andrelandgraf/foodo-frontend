import { useContext, useMemo } from 'react';

import { IngredientsContext } from '../provider/IngredientsProvider';
import { UserStateContext } from '../provider/UserStateProvider';
import useDisplayableRecipes from './useDisplayableRecipes';


const getIngredientAllergies = ( ingredient, ingredients ) => ingredients
    .find( i => i._id === ingredient.ingredient ).notForAllergies;

const getIngredientNotLifestyles = ( ingredient, ingredients ) => ingredients
    .find( i => i._id === ingredient.ingredient ).notForLifestyles;

const getNotForAllergies = ( recipe, ingredients, allergies ) => allergies
    .filter( a => recipe.ingredients
        .find( i => getIngredientAllergies( i, ingredients )
            .find( ia => ia === a._id ) ) )
    .map( a => a.name );

const getNotForLifestyle = ( recipe, ingredients, lifestyle ) => (
    recipe.ingredients
        .filter( i => getIngredientNotLifestyles( i, ingredients )
            .find( l => l === lifestyle._id ) )
        .length
        ? lifestyle.name
        : ''
);

export const mapRecipesTagged = ( recipes, ingredients, user ) => (
    recipes && ingredients && ingredients.length && user
        ? recipes.map( recipe => ( {
            ...recipe,
            notForAllergies: getNotForAllergies( recipe, ingredients, user.allergies ),
            notForLifestyle: user.lifestyle ? getNotForLifestyle( recipe, ingredients, user.lifestyle ) : '',
        } ) )
        : []
);

function useTaggedRecipes() {
    const displayableRecipes = useDisplayableRecipes();
    const { ingredients } = useContext( IngredientsContext );
    const { user } = useContext( UserStateContext );
    return useMemo( () => mapRecipesTagged( displayableRecipes, ingredients, user ),
        [ displayableRecipes, ingredients, user ] );
}

export default useTaggedRecipes;
