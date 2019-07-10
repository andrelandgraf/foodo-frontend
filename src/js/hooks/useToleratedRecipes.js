import { useMemo, useContext } from 'react';

import { UserStateContext } from '../provider/UserStateProvider';
import { IngredientsContext } from '../provider/IngredientsProvider';
import useTaggedRecipes from './useTaggedRecipes';

const getNotForAllergy = ( id, ingredients ) => ingredients
    .find( i => i._id === id ).notForAllergies;

const filterTolerated = ( recipes, ingredients, allergies ) => (
    recipes && ingredients && ingredients.length && allergies
        ? recipes
            .filter( r => !r.ingredients
                .find( i => getNotForAllergy( i.ingredient, ingredients )
                    .find( allergyId => allergies.find( a => a._id === allergyId ) ) ) )
        : []
);

const useToleratedRecipes = () => {
    const { user } = useContext( UserStateContext );
    const { ingredients } = useContext( IngredientsContext );
    const taggedRecipes = useTaggedRecipes();
    return useMemo( () => filterTolerated( taggedRecipes, ingredients, user.allergies ),
        [ taggedRecipes, user, ingredients ] );
};

export default useToleratedRecipes;
