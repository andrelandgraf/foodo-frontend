import { useState, useContext, useEffect } from 'react';
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
    const [ displayableUserRecipes, setDisplayableUserRecipes ] = useState(
        mapUserRecipesDisplayable( userRecipes ),
    );

    useEffect( () => {
        setDisplayableUserRecipes( mapUserRecipesDisplayable( userRecipes ) );
    }, [ userRecipes ] );

    return displayableUserRecipes;
}

export default useDisplayableUserRecipes;
