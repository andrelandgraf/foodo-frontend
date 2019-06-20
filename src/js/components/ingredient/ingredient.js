import React from 'react';
import PropTypes from 'prop-types';

const Ingredient = ( { ingredient } ) => (
    <div className="substitute">
        { ingredient.label }
    </div>
);

Ingredient.propTypes = {
    ingredient: PropTypes.shape( {
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
    } ).isRequired,
};

export default Ingredient;
