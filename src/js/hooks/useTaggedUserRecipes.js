import { useMemo, useContext } from 'react';

import { IngredientsContext } from '../provider/IngredientsProvider';
import { UserStateContext } from '../provider/UserStateProvider';
import useDisplayableUserRecipes from './useDisplayableUserRecipes';
import { mapRecipesTagged } from './useTaggedRecipes';

function useTaggedUserRecipes() {
    const displayableUserRecipes = useDisplayableUserRecipes();
    const { ingredients } = useContext( IngredientsContext );
    const { user } = useContext( UserStateContext );
    return useMemo( () => mapRecipesTagged( displayableUserRecipes, ingredients, user ),
        [ displayableUserRecipes, ingredients, user ] );
}

export default useTaggedUserRecipes;
