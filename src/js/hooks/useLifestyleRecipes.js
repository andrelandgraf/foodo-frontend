import { useState, useEffect, useContext } from 'react';

import useDisplayableRecipes from './useDisplayableRecipes';
import { UserStateContext } from '../provider/UserStateProvider';
import { IngredientsContext } from '../provider/IngredientsProvider';

const getNotForLifestyle = ( id, ingredients ) => ingredients
    .find( i => i._id === id ).notForLifestyles;

const filterByLifestyle = ( recipes, ingredients, lifestyle ) => (
    recipes && ingredients && ingredients.length && lifestyle
        ? recipes
            .filter( r => !r.ingredients
                .find( i => getNotForLifestyle( i.ingredient, ingredients )
                    .find( lifestyleId => lifestyleId === lifestyle._id ) ) )
        : []
);

const useLifestyleRecipes = () => {
    const { user } = useContext( UserStateContext );
    const { ingredients } = useContext( IngredientsContext );
    const displayableRecipes = useDisplayableRecipes();
    const [ lifestyleRecipes, setLifestyleRecipes ] = useState(
        filterByLifestyle( displayableRecipes, ingredients, user.lifestyle ),
    );

    useEffect( () => {
        setLifestyleRecipes( filterByLifestyle( displayableRecipes, ingredients, user.lifestyle ) );
    }, [ displayableRecipes, user, ingredients ] );

    return lifestyleRecipes;
};

export default useLifestyleRecipes;
