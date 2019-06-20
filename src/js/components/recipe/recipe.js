import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ( { recipe } ) => (
    <div className="recipe">
        <h2>{ recipe.name }</h2>
        { recipe.ingredients.map(
            ingderient => (
                <div key={ingderient._id} className="ingridient">
                    { ingderient.name._id }
                </div>
            ),
        )}
    </div>
);

Recipe.propTypes = {
    recipe: PropTypes.shape( {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ingridients: PropTypes.arrayOf(
            PropTypes.shape( {
                name: PropTypes.string.isRequired,
                _id: PropTypes.string.isRequired,
            } ),
        ).isRequired,
    } ).isRequired,
};

export default Recipe;
