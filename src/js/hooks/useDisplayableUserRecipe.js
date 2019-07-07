import { useState, useContext, useEffect } from 'react';
import lodash from 'lodash';

import { getLocale } from '../utilities/internationalization/internationalization';

import { UserRecipeContext } from '../provider/UserRecipeProvider';

const mapRecipeIngredientsDisplayable = ( ingredients, locale ) => ( ingredients
    ? lodash.cloneDeep( ingredients ).map( ingredient => ( {
        ...ingredient.ingredient,
        amount: ingredient.amount,
        label: ingredient.ingredient.name[ locale ],
        key: ingredient.ingredient._id,
        substitutionFor: ingredient.substitutionFor,
    } ) )
    : [] );

const mapUserRecipeToRecipes = ( userRecipe, locale ) => {
    if ( !userRecipe ) return [ undefined, undefined ];
    const displayableUserRecipe = lodash.cloneDeep( userRecipe );
    const { personalizedRecipe: recipe } = displayableUserRecipe;
    const { origRecipe: dOrigRecipe, ingredients: i } = recipe;
    const ingredients = mapRecipeIngredientsDisplayable( i, locale );
    const dRecipe = {
        ...dOrigRecipe,
        ingredients,
    };
    dOrigRecipe.ingredients = mapRecipeIngredientsDisplayable( dOrigRecipe.ingredients, locale );
    return [ dRecipe, dOrigRecipe ];
};

function useDisplayableUserRecipe() {
    const { userRecipe } = useContext( UserRecipeContext );
    const [ dRecipe, dOrigRecipe ] = mapUserRecipeToRecipes( userRecipe, getLocale() );
    const [ displayableRecipe, setDisplayableRecipe ] = useState( dRecipe );
    const [ displayableOrigRecipe, setDisplayableOrigRecipe ] = useState( dOrigRecipe );

    useEffect( () => {
        const [ recipe, origRecipe ] = mapUserRecipeToRecipes( userRecipe, getLocale() );
        setDisplayableRecipe( recipe );
        setDisplayableOrigRecipe( origRecipe );
    }, [ userRecipe ] );

    return [ displayableRecipe, displayableOrigRecipe ];
}

export default useDisplayableUserRecipe;
