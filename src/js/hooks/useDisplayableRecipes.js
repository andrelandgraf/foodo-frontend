import { useMemo, useContext } from 'react';
import lodash from 'lodash';

import { RecipesContext } from '../provider/RecipesProvider';

const mapRecipesDisplayable = recipes => ( recipes
    ? lodash.cloneDeep( recipes ).map( recipe => ( {
        ...recipe,
        label: recipe.name,
        key: recipe._id,
    } ) )
    : recipes );

function useDisplayableRecipes() {
    const { recipes } = useContext( RecipesContext );
    return useMemo( () => mapRecipesDisplayable( recipes ), [ recipes ] );
}

export default useDisplayableRecipes;
