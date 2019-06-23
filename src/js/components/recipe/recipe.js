import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import hourglass from '../../../img/hourglass.svg';
import IngredientsTable from './elements/ingredientsTable';
import NutritionTable from './elements/nutritionTable';

const Recipe = ( {
    recipe, substitutableIngredients, onClickIngredient, lastClient, Message,
} ) => (
    <div className="recipe">
        <div className="center">
            <h2>{ recipe.name }</h2>
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
        <div className="recipe-tables-container">
            <IngredientsTable
                ingredients={recipe.ingredients}
                substitutableIngredients={substitutableIngredients}
                onClickIngredient={onClickIngredient}
            />
            <NutritionTable ingredients={recipe.ingredients} />
        </div>
    </div>
);

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
    lastClient: PropTypes.string,
    onClickIngredient: PropTypes.func.isRequired,
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
