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

    const getNutritionValues = ( nutritionValuesNames, ingredientList ) => lodash
        .cloneDeep( nutritionValuesNames )
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

    // eslint-disable-next-line no-unused-vars
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

    const sumUserAndOrigNutritionValues = () => lodash.cloneDeep(
        userRecipesWithIngredients,
    ).reduce(
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

            return Object.assign( {}, {
                user: sumNutritionValues( userNutritionValues, acc.user ),
                original: sumNutritionValues( originalNutritionValues, acc.original ),
            } );
        }, {
            user: {
                Protein: 0,
                DietaryFiber: 0,
                AddedSugars: 0,
                Salt: 0,
                SFA: 0,
            },
            original: {
                Protein: 0,
                DietaryFiber: 0,
                AddedSugars: 0,
                Salt: 0,
                SFA: 0,
            },
        },
    );

    const nutritionValueNamesForDisplay = {
        Protein: 'Protein',
        DietaryFiber: 'Fiber',
        AddedSugars: 'Sugar',
        Salt: 'Salt',
        SFA: 'Saturated Fats',
    };

    const formatNutritionValues = nutritionValues => (
        goodNutritionValues.concat( badNutritionValues ).map( name => ( {
            name: nutritionValueNamesForDisplay[ name ],
            userValue: Math.round( nutritionValues.user[ name ] ),
            originalValue: Math.round( nutritionValues.original[ name ] ),
        } ) )
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
                    sumUserAndOrigNutritionValues( lodash.cloneDeep( userRecipesWithIngredients ) ),
                ).map( nutritionValue => (
                    <NutritionElementStat
                        data={nutritionValue}
                        goodNutritionElement={goodNutritionValues.find(
                            element => element === nutritionValue.name,
                        )}
                    />
                ) )

            )
                : null}
        </div>
    );
}

export default StatisticsContainer;
