import React, { useContext, useMemo } from 'react';
import lodash from 'lodash';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { computeNutriScoreForRecipe } from '../../utilities/nutriScore';

import { UserRecipesContext } from '../../provider/UserRecipesProvider';
import { IngredientsContext } from '../../provider/IngredientsProvider';

import NutriScoreStat from '../../components/statistic/nutriScoreStat';
import NutritionElementStat from '../../components/statistic/nutritionElementStat';
import SimpleView from '../../components/view/simpleView';
import Content from '../../components/content/content';


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
            const originalNutriScore = computeNutriScoreForRecipe(
                userRecipe.personalizedRecipe.origRecipe.ingredients,
            );
            const userNutriScore = computeNutriScoreForRecipe(
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
            userValue: nutritionValues.user[ name ],
            originalValue: nutritionValues.original[ name ],
        } ) )
    );

    const nutritionScoreStat = useMemo( () => ( loadingDone
        ? (
            <NutriScoreStat improvedScore={
                gainedNutriScoreImprovements(
                    lodash.cloneDeep( userRecipesWithIngredients ),
                )}
            />
        )
        : null
    ), [ loadingDone ] );

    const nutritionElementStats = useMemo( () => ( loadingDone
        ? formatNutritionValues(
            sumUserAndOrigNutritionValues(
                lodash.cloneDeep( userRecipesWithIngredients ),
            ),
        ).map( nutritionValue => (
            <NutritionElementStat
                key={nutritionValue.name}
                data={nutritionValue}
                goodNutritionElement={!!goodNutritionValues.find(
                    element => nutritionValueNamesForDisplay[ element ]
                    === nutritionValue.name,
                )}
            />
        ) )
        : null
    ), [ loadingDone ] );

    return (
        <SimpleView title={<h1>{i18n.t( KEYS.HEADERS.STATISTICS )}</h1>}>
            <Content classes="statistics-container">
                {nutritionScoreStat}
                {nutritionElementStats}
            </Content>
        </SimpleView>
    );
}

export default StatisticsContainer;
