import { useState, useContext, useEffect } from 'react';
import lodash from 'lodash';

import { getLocale } from '../utilities/internationalization/internationalization';

import { IngredientsContext } from '../provider/IngredientsProvider';

const mapIngredientsDisplayable = ( ingredients, locale ) => ( ingredients
    ? lodash.cloneDeep( ingredients ).map( ingredient => ( {
        ...ingredient,
        label: ingredient.name[ locale ],
        key: ingredient._id,
    } ) )
    : [] );

function useDisplayableIngredients() {
    const { ingredients } = useContext( IngredientsContext );
    const [ displayableIngredients, setDisplayableIngredients ] = useState(
        mapIngredientsDisplayable( ingredients, getLocale() ),
    );

    useEffect( () => {
        setDisplayableIngredients( mapIngredientsDisplayable( ingredients, getLocale() ) );
    }, [ ingredients ] );

    return displayableIngredients;
}

export default useDisplayableIngredients;
