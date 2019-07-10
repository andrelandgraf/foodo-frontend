import React, { useContext } from 'react';
import { UserRecipesContext } from '../../provider/UserRecipesProvider';
import { RecipesContext } from '../../provider/RecipesProvider';
import { IngredientsContext } from '../../provider/IngredientsProvider';

function StatisticsContainer() {
    const userRecipes = useContext( UserRecipesContext );
    const recipes = useContext( RecipesContext );
    const ingredients = useContext( IngredientsContext );

    console.log( userRecipes );
    console.log( recipes );
    console.log( ingredients );

    return (
        <div>
            Penis
        </div>
    );
}

export default StatisticsContainer;
