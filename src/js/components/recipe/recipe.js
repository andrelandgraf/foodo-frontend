import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import hourglass from '../../../img/hourglass.svg';
import IngredientsTable from './elements/ingredientsTable';
import NutritionTable from './elements/nutritionTable';
import BarStats from './elements/barStats';
import PieStats from './elements/pieStats';

const Recipe = ( {
    recipe, origRecipe, substitutableIngredients, onClickIngredient, lastClient, Message, onEdit,
} ) => {
    const sumRecipe = ( ingredient ) => {
        const totalRecipe = {
            weight: 0,
            calories: 0,
            fat: 0,
            sfa: 0,
            carbs: 0,
            sugar: 0,
            protein: 0,
            salt: 0,
            fiber: 0,
            relativeCalories: 0,
            relativeFat: 0,
            relativeSfa: 0,
            relativeCarbs: 0,
            relativeSugar: 0,
            relativeProtein: 0,
            relativeSalt: 0,
        };

        const relativeValue = ( total, ref ) => ( total / totalRecipe.weight * 400 ) * 100 / ref;

        ingredient.forEach( ( ingr ) => {
            totalRecipe.weight += ingr.amount * ingr.unit.amount;
            totalRecipe.calories += ingr.elements.KCal * ingr.amount;
            totalRecipe.fat += ingr.elements.TotalFat * ingr.amount;
            totalRecipe.sfa += ingr.elements.SFA * ingr.amount;
            totalRecipe.carbs += ingr.elements.Carbohydrate * ingr.amount;
            totalRecipe.sugar += ingr.elements.AddedSugars * ingr.amount;
            totalRecipe.protein += ingr.elements.Protein * ingr.amount;
            totalRecipe.salt += ingr.elements.Salt * ingr.amount;
        } );

        totalRecipe.relativeCalories = Math.round( relativeValue( totalRecipe.calories, 2000 ) );
        totalRecipe.relativeFat = Math.round( relativeValue( totalRecipe.fat, 70 ) );
        totalRecipe.relativeSfa = Math.round( relativeValue( totalRecipe.sfa, 20 ) );
        totalRecipe.relativeCarbs = Math.round( relativeValue( totalRecipe.carbs, 260 ) );
        totalRecipe.relativeSugar = Math.round( relativeValue( totalRecipe.sugar, 90 ) );
        totalRecipe.relativeProtein = Math.round( relativeValue( totalRecipe.protein, 50 ) );
        totalRecipe.relativeSalt = Math.round( relativeValue( totalRecipe.salt, 6 ) );
        return totalRecipe;
    };

    const totalRecipe = sumRecipe( recipe.ingredients );

    return (
        <div className="recipe">
            <div className="center">
                <h3>{ recipe.name }</h3>
                <span className="recipe-preparation-time">
                    <img
                        src={hourglass}
                        alt="Preparation time"
                        classes="icon-item"
                    />
                    {recipe.preparationTime}
                min
                </span>
                <p>{ lastClient && `[${ i18n.t( KEYS.LABELS.EDITED_WITH ) } ${ lastClient }]`}</p>
            </div>
            <img src={recipe.imgUrl} alt={recipe.name} className="recipePic" />
            { Message }
            <div className="recipe-content">
                <IngredientsTable
                    ingredients={recipe.ingredients}
                    substitutableIngredients={substitutableIngredients}
                    onClickIngredient={onClickIngredient}
                    onEdit={onEdit}
                />
                <PieStats totalRecipe={totalRecipe} />
            </div>
            <div className="recipe-content large-content">
                <NutritionTable totalRecipe={totalRecipe} />
                <BarStats
                    totalRecipe={totalRecipe}
                    totalOrigRecipe={sumRecipe( origRecipe.ingredients )}
                />
            </div>
        </div>
    );
};

Recipe.propTypes = {
    recipe: PropTypes.shape( {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        preparationTime: PropTypes.number.isRequired,
        meal: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(
            PropTypes.shape( {
                label: PropTypes.string.isRequired,
                key: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired,
                unit: PropTypes.shape( {
                    amount: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                } ),
            } ),
        ).isRequired,
        imgUrl: PropTypes.string,
    } ).isRequired,
    origRecipe: PropTypes.shape( {
        ingredients: PropTypes.arrayOf(
            PropTypes.shape( {
                label: PropTypes.string.isRequired,
                key: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired,
                unit: PropTypes.shape( {
                    amount: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                } ),
            } ),
        ).isRequired,
    } ).isRequired,
    lastClient: PropTypes.string,
    onClickIngredient: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    substitutableIngredients: PropTypes.arrayOf(
        PropTypes.string,
    ).isRequired,
    Message: PropTypes.node,
};

Recipe.defaultProps = {
    lastClient: '',
    Message: null,
};

export default Recipe;
