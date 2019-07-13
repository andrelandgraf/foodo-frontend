import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import lodash from 'lodash';

import { UserRecipesContext } from '../../provider/UserRecipesProvider';
// import { RecipesContext } from '../../provider/RecipesProvider';
import { IngredientsContext } from '../../provider/IngredientsProvider';
import NutriScoreStat from '../../components/statistic/nutriScoreStat';
import NutritionElementStat from '../../components/statistic/nutritionElementStat';
import NutriScoreUtility from '../../utilities/nutriScore';

function StatisticsContainer() {
    const { ingredients } = useContext( IngredientsContext );
    const { userRecipes } = useContext( UserRecipesContext );

    const loadingDone = ingredients.length && userRecipes;

    const goodNutritionValues = [ 'Protein', 'DietaryFiber' ];
    const badNutritionValues = [ 'AddedSugars', 'Salt', 'SFA' ];

    const setIngredientsInIngredientsList = ingredientsList => (
        ingredientsList.map(
            element => Object.assign( {}, element,
                {
                    ingredient: lodash.cloneDeep( ingredients.find(
                        ingredient => ingredient._id === element.ingredient,
                    ) ),
                } ),
        )
    );

    const setIngredientsForUserRecipes = () => (
        lodash.cloneDeep( userRecipes ).map(
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

    const userRecipesWithIngredients = loadingDone
        ? setIngredientsForUserRecipes() : null;

    const gainedNutriScoreImprovements = () => userRecipesWithIngredients.reduce(
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

    const getNutritionValues = ( nutritionValuesNames, ingredientList ) => nutritionValuesNames
        .reduce( ( acc, name ) => (
            Object.assign( {}, acc, {
                [ name ]: lodash.cloneDeep( ingredientList ).reduce(
                    ( sum, element ) => +sum
                    + element.ingredient.elements[ name ]
                        * element.amount,
                    0,
                ),
            } )
        ), {} );

    const sumNutritionValues = ( nutritionValues1, nutritionValues2 ) => (
        Object.keys( nutritionValues1 ).reduce( ( akk, key ) => Object.assign(
            { [ key ]: nutritionValues1[ key ] + nutritionValues2[ key ] }, akk,
        ), {} )
    );

    const diffNutritionValues = ( nutritionValues1,
        nutritionValues2, nutritionValueNames ) => (
        nutritionValueNames.reduce( ( acc, name ) => Object.assign(
            {
                [ name ]: nutritionValues1[ name ]
                - nutritionValues2[ name ],
            }, acc,
        ), {} )
    );

    // eslint-disable-next-line no-unused-vars
    const sumAmount = ingredientList => lodash.cloneDeep( ingredientList ).reduce(
        ( sum, element ) => sum + element.amount * 100, 0,
    );

    const gainedNutritionValues = () => userRecipesWithIngredients.reduce(
        ( acc, userRecipe ) => {
            const originalNutritionValues = getNutritionValues(
                goodNutritionValues.concat( badNutritionValues ),
                userRecipe.personalizedRecipe.origRecipe.ingredients,
            );
            const userNutritionValues = getNutritionValues(
                goodNutritionValues.concat( badNutritionValues ),
                userRecipe.personalizedRecipe.ingredients,
            );

            console.log( `original ${ JSON.stringify( originalNutritionValues ) }` );
            console.log( `user ${ JSON.stringify( userNutritionValues ) }` );

            // eslint-disable-next-line no-unused-vars
            const diffs = Object.assign( {},
                diffNutritionValues( userNutritionValues,
                    originalNutritionValues,
                    goodNutritionValues.concat( badNutritionValues ) ) );

            return sumNutritionValues( diffs, acc );
        }, {
            Protein: 0,
            DietaryFiber: 0,
            AddedSugars: 0,
            Salt: 0,
            SFA: 0,
        },
    );

    const formatNutritionValues = nutritionValues => (
        Object.keys( nutritionValues ).reduce( ( acc, key ) => acc.concat(
            { name: key, value: nutritionValues[ key ] },
        ), [] )
    );

    console.log( userRecipes );
    console.log( userRecipesWithIngredients );
    // console.log( originalRecipes.recipes );
    console.log( ingredients );

    return (
        <div className="box">
            {
                loadingDone ? (
                    <NutriScoreStat improvedScore={
                        gainedNutriScoreImprovements(
                            lodash.cloneDeep( userRecipesWithIngredients ),
                        )}
                    />
                )
                    : null
            }
            {loadingDone ? (
                formatNutritionValues(
                    gainedNutritionValues( lodash.cloneDeep( userRecipesWithIngredients ) ),
                ).map( nutritionValue => (
                    <NutritionElementStat
                        data={[ nutritionValue ]}
                    />
                ) )

            )
                : null}
        </div>
    );
}

export default StatisticsContainer;
