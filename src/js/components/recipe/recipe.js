import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ( { recipe } ) => (
    <div className="recipe">
        <div className="center">
            <h2>{ recipe.name }</h2>
        </div>
        <img src={recipe.imgUrl} alt={recipe.name} className="recipePic" />
        <div>
            <img
                src="../../img/hourglass.svg"
                alt="Preparation time"
                classes="icon-item"
            />
            {' : '}
            {recipe.preparationTime}
            min
        </div>
        <ul>
            { recipe.ingredients.map(
                ingredient => (
                    <li key={ingredient.key}>
                        { ingredient.label}
                    </li>
                ),
            )}
        </ul>
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
            } ),
        ).isRequired,
        imgUrl: PropTypes.string,
    } ).isRequired,
};

export default Recipe;
