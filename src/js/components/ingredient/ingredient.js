import React from 'react';
import PropTypes from 'prop-types';

import Cancel from '../../../img/cancel.svg';

import ImageButton from '../button/imageButton';
import CustomButton from '../button/customButton';

const Ingredient = ( { ingredient, onClose, onClick } ) => (
    <div className="substitute">
        <CustomButton
            classes="substitute-btn"
            id={`click-substitute${ ingredient.key }`}
            onClick={() => onClick( ingredient )}
        >
            <div className="name-score">
                <span className="name">
                    { `Name: ${ ingredient.label }` }
                </span>
                <span className="nutriscore">
                    { `NutriScore: ${ ingredient.nutriScore }`}
                </span>
            </div>
            <span>
                { `Amount: ${ Number( ingredient.amount ) * 100 } ${ ingredient.unit.name }` }
            </span>
        </CustomButton>
        <ImageButton
            classes="substitute-cancel-btn"
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
        nutriScore: PropTypes.number.isRequired,
    } ).isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Ingredient;
