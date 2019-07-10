import { useMemo, useContext } from 'react';
import lodash from 'lodash';

import { getLocale } from '../utilities/internationalization/internationalization';

import { IngredientsContext } from '../provider/IngredientsProvider';

export const mapIngredientsDisplayable = ( ingredients, locale ) => ( ingredients
    ? lodash.cloneDeep( ingredients ).map( ingredient => ( {
        ...ingredient,
        label: ingredient.name[ locale ],
        key: ingredient._id,
    } ) )
    : [] );

function useDisplayableIngredients() {
    const { ingredients } = useContext( IngredientsContext );
    return useMemo( () => mapIngredientsDisplayable( ingredients, getLocale() ), [ ingredients ] );
}

export default useDisplayableIngredients;
