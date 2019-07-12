import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import cancel from '../../../img/cancel.svg';

import ImageButton from '../button/imageButton';
import CustomButton from '../button/customButton';

const Ingredient = ( { ingredient, onClose, onClick } ) => {
    const onClickCallback = useCallback( () => onClick && onClick( ingredient ),
        [ ingredient, onClick ] );
    const onCloseCallback = useCallback( () => onClose( ingredient ),
        [ ingredient, onClose ] );

    const Content = (
        <>
            <div className="name-score">
                <span className="name">
                    { ingredient.label }
                </span>
                {
                    Number.isInteger( ingredient.nutriScore )
                        && (
                            <span className="nutriscore">
                                { `NutriScore: ${ ingredient.nutriScore }`}
                            </span>
                        )
                }
            </div>
            <span>
                { `Amount: ${
                    +( Number( ingredient.amount ) * Number( ingredient.unit.amount ) ).toFixed( 2 )
                } ${ ingredient.unit.name }` }
            </span>
        </>
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
                src={cancel}
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
