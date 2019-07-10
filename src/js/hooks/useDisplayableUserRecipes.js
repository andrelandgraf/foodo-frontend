import { useMemo, useContext } from 'react';
import lodash from 'lodash';

import { UserRecipesContext } from '../provider/UserRecipesProvider';

const mapUserRecipesDisplayable = recipes => ( recipes
    ? lodash.cloneDeep( recipes ).map( recipe => ( {
        ...recipe.personalizedRecipe.origRecipe,
        label: recipe.personalizedRecipe.origRecipe.name,
        key: recipe.personalizedRecipe.origRecipe._id,
    } ) )
    : [] );

function useDisplayableUserRecipes() {
    const { userRecipes } = useContext( UserRecipesContext );
    return useMemo( () => mapUserRecipesDisplayable( userRecipes ),
        [ userRecipes ] );
}

export default useDisplayableUserRecipes;
