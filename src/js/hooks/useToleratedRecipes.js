import { useState, useEffect, useContext } from 'react';

import { UserStateContext } from '../provider/UserStateProvider';
import { IngredientsContext } from '../provider/IngredientsProvider';
import useTaggedRecipes from './useTaggedRecipes';

const getNotForAllergy = ( id, ingredients ) => ingredients
    .find( i => i._id === id ).notForAllergy;

const filterTolerated = ( recipes, ingredients, allergies ) => (
    recipes && ingredients && ingredients.length && allergies
        ? recipes
            .filter( r => !r.ingredients
                .find( i => getNotForAllergy( i.ingredient, ingredients )
                    .find( allergyId => allergies.find( a => a._id === allergyId ) ) ) )
        : []
);

const useToleratedRecipes = () => {
    const { user } = useContext( UserStateContext );
    const { ingredients } = useContext( IngredientsContext );
    const taggedRecipes = useTaggedRecipes();
    const [ toleratedRecipes, setToleratedRecipes ] = useState(
        filterTolerated( taggedRecipes, ingredients, user.allergies ),
    );

    useEffect( () => {
        setToleratedRecipes( filterTolerated( taggedRecipes, ingredients, user.allergies ) );
    }, [ taggedRecipes, user, ingredients ] );

    return toleratedRecipes;
};

export default useToleratedRecipes;
