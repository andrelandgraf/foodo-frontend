import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Cancel from '../../../img/cancel.svg';

import ImageButton from '../button/imageButton';
import CustomButton from '../button/customButton';

const Ingredient = ( { ingredient, onClose, onClick } ) => {
    const onClickCallback = useCallback( () => onClick && onClick( ingredient ),
        [ ingredient, onClick ] );
    const onCloseCallback = useCallback( () => onClose( ingredient ),
        [ ingredient, onClose ] );

    const Content = (
        <React.Fragment>
            <div className="name-score">
                <span className="name">
                    { `Name: ${ ingredient.label }` }
                </span>
                {
                    ingredient.nutriScore && (
                        <span className="nutriscore">
                            { `NutriScore: ${ ingredient.nutriScore }`}
                        </span>
                    )
                }
            </div>
            <span>
                { `Amount: ${ Number( ingredient.amount ) * 100 } ${ ingredient.unit.name }` }
            </span>
        </React.Fragment>
    );
    return (
        <div className="ingredient">
            {
                onClick
                    ? (
                        <CustomButton
                            classes="ingredient-content"
                            id={`click-substitute${ ingredient.key }`}
                            onClick={onClickCallback}
                        >
                            { Content }
                        </CustomButton>
                    )
                    : (
                        <div className="ingredient-content">
                            { Content }
                        </div>
                    )
            }
            <ImageButton
                classes="ingredient-x-btn"
                id={`dismiss-ingredient${ ingredient.key }`}
                alt="dismiss ingredient"
                src={Cancel}
                onClick={onCloseCallback}
            />
        </div>
    );
};

Ingredient.propTypes = {
    ingredient: PropTypes.shape( {
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        nutriScore: PropTypes.number,
    } ).isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

Ingredient.defaultProps = {
    onClick: undefined,
};

export default Ingredient;
