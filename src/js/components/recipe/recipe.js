import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ( { recipe } ) => (
    <div className="recipe">
        <h2>{ recipe.name }</h2>
        { recipe.ingridients.map(
            ingdirient => (
                <div className="ingridient">
                    { ingdirient.name }
                </div>
            ),
        )}
    </div>
);

Recipe.propTypes = {
    recipe: PropTypes.shape( {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        ingridients: PropTypes.arrayOf(
            PropTypes.shape( {
                name: PropTypes.number.isRequired,
                id: PropTypes.number.isRequired,
            } ),
        ).isRequired,
    } ).isRequired,
};

export default Recipe;
