import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ( { recipe } ) => (
    <div className="recipe">
        <h2>{ recipe.name }</h2>
        { recipe.ingredients.map(
            ingderient => (
                <div key={ingderient._id} className="ingridient">
                    { ingderient.label._id }
                </div>
            ),
        )}
    </div>
);

Recipe.propTypes = {
    recipe: PropTypes.shape( {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(
            PropTypes.shape( {
                label: PropTypes.string.isRequired,
                _id: PropTypes.string.isRequired,
            } ),
        ).isRequired,
    } ).isRequired,
};

export default Recipe;
