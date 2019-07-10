import { useMemo, useContext } from 'react';

import { UserStateContext } from '../provider/UserStateProvider';
import { IngredientsContext } from '../provider/IngredientsProvider';
import useTaggedRecipes from './useTaggedRecipes';

const getNotForLifestyle = ( id, ingredients ) => ingredients
    .find( i => i._id === id ).notForLifestyles;

const filterByLifestyle = ( recipes, ingredients, lifestyle ) => (
    recipes && ingredients && ingredients.length && lifestyle
        ? recipes
            .filter( r => !r.ingredients
                .find( i => getNotForLifestyle( i.ingredient, ingredients )
                    .find( lifestyleId => lifestyleId === lifestyle._id ) ) )
        : []
);

const useLifestyleRecipes = () => {
    const { user } = useContext( UserStateContext );
    const { ingredients } = useContext( IngredientsContext );
    const taggedRecipes = useTaggedRecipes();
    return useMemo( () => filterByLifestyle( taggedRecipes, ingredients, user.lifestyle ),
        [ taggedRecipes, user, ingredients ] );
};

export default useLifestyleRecipes;
