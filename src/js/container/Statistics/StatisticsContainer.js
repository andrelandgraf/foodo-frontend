import React, { useContext } from 'react';
import { UserRecipesContext } from '../../provider/UserRecipesProvider';
import { RecipesContext } from '../../provider/RecipesProvider';
import { IngredientsContext } from '../../provider/IngredientsProvider';
import NutriScoreStat from '../../components/statistic/nutriScoreStat';
import NutritionElementStat from '../../components/statistic/nutritionElementStat';
// import NutriScoreUtility from '../../utilities/nutriScore';

function StatisticsContainer() {
    const userRecipes = useContext( UserRecipesContext );
    const originalRecipes = useContext( RecipesContext );
    const ingredients = useContext( IngredientsContext );

    const setIngredientsInRecipe = ( recipe ) => {
        console.log( recipe );
        const newRecipe = Object.assign( {}, recipe,
            {
                ingredients: recipe.ingredients.reduce(
                    ( acc, element ) => acc.concat( Object.assign( {}, element,
                        {
                            ingredient: ingredients.ingredients.find(
                                ( ingredient ) => {
                                    if ( ingredient._id === element._id ) console.log( `123 ${ ingredient._id === element._id }` );
                                    if ( ingredient._id === element.ingredient._id ) console.log( `456 ${ ingredient._id === element.ingredient._id }` );
                                    return ingredient._id === element._id;
                                },
                            ),
                        } ) ),
                    [],
                ),
            } );

        console.log( newRecipe );
        return {};
    };
    /*
    const summedNutriscoreOfRecipes = recipes => recipes.reduce(
        ( sum, recipe ) => NutriScoreUtility.computeNutriScoreForRecipe( recipe.ingredients ), 0,
    ); */

    console.log( userRecipes );
    console.log( originalRecipes.recipes );
    console.log( ingredients );
    console.log( setIngredientsInRecipe( originalRecipes.recipes[ 0 ] ) );
    // console.log( summedNutriscoreOfRecipes( originalRecipes.recipes ) );

    return (
        <div className="box">
            <NutriScoreStat improvedScore={1} />
            <NutritionElementStat
                data={[ {
                    name: '18-24',
                    uv: 31.47,
                    pv: 2400,
                },
                {
                    name: '25-29',
                    uv: 10,
                    pv: 4567,
                } ]}
            />
        </div>
    );
}

export default StatisticsContainer;
