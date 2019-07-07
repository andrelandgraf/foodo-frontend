import { useState, useEffect, useContext } from 'react';
import lodash from 'lodash';

import useDisplayableRecipes from './useDisplayableRecipes';
import { UserStateContext } from '../provider/UserStateProvider';
import { IngredientsContext } from '../provider/IngredientsProvider';

const getNotForAllergy = ( id, ingredients ) => ingredients
    .find( i => i._id === id ).notForAllergy;

const filterTolerated = ( recipes, ingredients, allergies ) => (
    recipes && ingredients && ingredients.length && allergies
        ? lodash.cloneDeep( recipes )
            .filter( r => !r.ingredients
                .find( i => getNotForAllergy( i.ingredient, ingredients )
                    .find( allergyId => allergies.find( a => a._id === allergyId ) ) ) )
        : []
);

const useToleratedRecipes = () => {
    const { user } = useContext( UserStateContext );
    const { ingredients } = useContext( IngredientsContext );
    const displayableRecipes = useDisplayableRecipes();
    const [ toleratedRecipes, setToleratedRecipes ] = useState(
        filterTolerated( displayableRecipes, ingredients, user.allergies ),
    );

    useEffect( () => {
        setToleratedRecipes( filterTolerated( displayableRecipes, ingredients, user.allergies ) );
    }, [ displayableRecipes, user, ingredients ] );

    return toleratedRecipes;
};

export default useToleratedRecipes;
