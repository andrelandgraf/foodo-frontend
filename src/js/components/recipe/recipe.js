import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ( { recipe } ) => (
    <div className="recipe">
        <h1>{ recipe.name }</h1>
        <i>{recipe.category}</i>
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
        <div>
    Servings:
            {' '}
            <input type="number" id="servings" min="1" max="100" step="1" value={recipe.servings} />
        </div>
        <ul>
            { recipe.ingredients.map(
                ingredient => (
                    <li key={ingredient._id}>
                        { ingredient.label.label}
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
                _id: PropTypes.string.isRequired,
            } ),
        ).isRequired,
        imgUrl: PropTypes.string,
    } ).isRequired,
};

export default Recipe;
