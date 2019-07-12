import React, { useContext } from 'react';
import { UserRecipesContext } from '../../provider/UserRecipesProvider';
// import { RecipesContext } from '../../provider/RecipesProvider';
import { IngredientsContext } from '../../provider/IngredientsProvider';
import NutriScoreStat from '../../components/statistic/nutriScoreStat';
import NutritionElementStat from '../../components/statistic/nutritionElementStat';
import NutriScoreUtility from '../../utilities/nutriScore';

function StatisticsContainer() {
    const ingredients = useContext( IngredientsContext );
    const currentUserRecipes = useContext( UserRecipesContext );

    const loadingDone = ingredients.ingredients.length && currentUserRecipes.userRecipes.length;

    const goodNutritionValues = [ 'Protein', 'DietaryFiber', 'proportionOfFruitsAndVegetables' ];
    const badNutritionValues = [ 'AddedSugars', 'Salt', 'SFA' ];

    const setIngredientsInIngredientsList = ingredientsList => (
        ingredientsList.map(
            element => Object.assign( {}, element,
                {
                    ingredient: ingredients.ingredients.find(
                        ingredient => ingredient._id === element.ingredient,
                    ),
                } ),
        )
    );

    const setIngredientsForUserRecipes = userRecipes => (
        userRecipes.map(
            ( userRecipe ) => {
                const newUserRecipe = Object.assign( {}, userRecipe );
                newUserRecipe.personalizedRecipe.ingredients = setIngredientsInIngredientsList(
                    userRecipe.personalizedRecipe.ingredients,
                );
                newUserRecipe.personalizedRecipe
                    .origRecipe.ingredients = setIngredientsInIngredientsList(
                        userRecipe.personalizedRecipe.origRecipe.ingredients,
                    );
                return newUserRecipe;
            },

        )
    );

    const gainedNutriScoreImprovements = userRecipes => userRecipes.reduce(
        ( sum, userRecipe ) => {
            const originalNutriScore = NutriScoreUtility.computeNutriScoreForRecipe(
                userRecipe.personalizedRecipe.origRecipe.ingredients,
            );
            const userNutriScore = NutriScoreUtility.computeNutriScoreForRecipe(
                userRecipe.personalizedRecipe.ingredients,
            );
            return sum + originalNutriScore - userNutriScore;
        }, 0,
    );

    const sumNutritionValues = ( nutritionValues1, nutritionValues2 ) => (
        nutritionValues1.keys().reduce( ( akk, key ) => Object.assign(
            { [ key ]: nutritionValues1[ key ] + nutritionValues2[ key ] }, akk,
        ), {} )
    );

    const diffNutritionValues = ( nutritionValues1, nutritionValues2, nutritionValueNames ) => (
        nutritionValueNames.reduce( ( akk, name ) => Object.assign(
            { [ name ]: nutritionValues1[ name ] - nutritionValues2[ name ] }, akk,
        ), {} )
    );

    const gainedNutritionValues = userRecipes => userRecipes.reduce(
        ( akk, userRecipe ) => {
            const originalNutritionValues = NutriScoreUtility
                .calculateNutritionValuesOfIngredientsList(
                    userRecipe.personalizedRecipe.origRecipe.ingredients,
                );
            const userNutritionValues = NutriScoreUtility.calculateNutritionValuesOfIngredientsList(
                userRecipe.personalizedRecipe.ingredients,
            );

            const diffs = Object.assign( {},
                diffNutritionValues( userNutritionValues, originalNutritionValues,
                    goodNutritionValues.concat( badNutritionValues ) ) );

            return sumNutritionValues( diffs, akk );
        }, 0,
    );

    const userRecipesWithIngredients = loadingDone
        ? setIngredientsForUserRecipes( useContext( UserRecipesContext ).userRecipes ) : null;

    console.log( userRecipesWithIngredients );
    // console.log( originalRecipes.recipes );
    console.log( ingredients.ingredients );
    console.log( loadingDone && userRecipesWithIngredients
        ? gainedNutritionValues( userRecipesWithIngredients ) : null );

    return (
        <div className="box">
            {
                loadingDone ? (
                    <NutriScoreStat improvedScore={
                        gainedNutriScoreImprovements( userRecipesWithIngredients )}
                    />
                )
                    : null
            }
            {loadingDone ? (
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
            )
                : null}
        </div>
    );
}

export default StatisticsContainer;
