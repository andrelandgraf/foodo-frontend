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
    const { recipes, status } = useContext( RecipesContext );
    return useMemo( () => ( {
        status, displayableRecipes: mapRecipesDisplayable( recipes ),
    } ), [ recipes, status ] );
}

export default useDisplayableRecipes;
