import { useState, useContext, useEffect } from 'react';

import { IngredientsContext } from '../provider/IngredientsProvider';
import { UserStateContext } from '../provider/UserStateProvider';
import useDisplayableUserRecipes from './useDisplayableUserRecipes';
import { mapRecipesTagged } from './useTaggedRecipes';

function useTaggedUserRecipes() {
    const displayableUserRecipes = useDisplayableUserRecipes();
    const { ingredients } = useContext( IngredientsContext );
    const { user } = useContext( UserStateContext );
    const [ taggedUserRecipes, setTaggedUserRecipes ] = useState(
        mapRecipesTagged( displayableUserRecipes, ingredients, user ),
    );

    useEffect( () => {
        setTaggedUserRecipes( mapRecipesTagged( displayableUserRecipes, ingredients, user ) );
    }, [ displayableUserRecipes, ingredients, user ] );

    return taggedUserRecipes;
}

export default useTaggedUserRecipes;
