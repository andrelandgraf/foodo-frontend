import React from 'react';
import PropTypes from 'prop-types';

import Cancel from '../../../img/cancel.svg';

import ImageButton from '../button/imageButton';

const Ingredient = ( { ingredient, onClose } ) => (
    <div className="substitute">
        <span>
            { `Name: ${ ingredient.label }` }
        </span>
        <span>
            { `Name: ${ ingredient.label }` }
        </span>
        <ImageButton
            id={`dismiss-substitute${ ingredient.key }`}
            alt="dismiss-substitute"
            src={Cancel}
            onClick={() => onClose( ingredient )}
        />
    </div>
);

Ingredient.propTypes = {
    ingredient: PropTypes.shape( {
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
    } ).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Ingredient;
