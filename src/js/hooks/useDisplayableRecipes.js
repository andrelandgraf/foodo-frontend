import { useState, useContext, useEffect } from 'react';
import lodash from 'lodash';

import { RecipesContext } from '../provider/RecipesProvider';

export const mapRecipesDisplayable = recipes => ( recipes
    ? lodash.cloneDeep( recipes ).map( recipe => ( {
        ...recipe,
        label: recipe.name,
        key: recipe._id,
    } ) )
    : recipes );

function useDisplayableRecipes() {
    const { recipes } = useContext( RecipesContext );
    const [ displayableRecipes, setDisplayableRecipes ] = useState(
        mapRecipesDisplayable( recipes ),
    );

    useEffect( () => {
        setDisplayableRecipes( mapRecipesDisplayable( recipes ) );
    }, [ recipes ] );

    return displayableRecipes;
}

export default useDisplayableRecipes;
