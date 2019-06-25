import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

import Button from '../../button/button';

function IngredientsTable( { ingredients, substitutableIngredients, onClickIngredient } ) {
    const unitToLabel = ( unit ) => {
        switch ( unit ) {
        case 'gramm': return 'g';
        case 'ml': return unit;
        default: return unit;
        }
    };

    return (
        <div>
            <h2>{i18n.t( KEYS.LABELS.INGREDIENTS )}</h2>
            <div className="ingredients-table">
                { ingredients.map(
                    ingredient => (
                        <React.Fragment key={ingredient.key}>
                            <span className="ingredients-table-amount">
                                {ingredient.amount * ingredient.unit.amount}
                            </span>
                            <span>
                                {unitToLabel( ingredient.unit.name )}
                            </span>
                            <span>
                                { ingredient.label}
                            </span>
                            <div>
                                {substitutableIngredients.find( id => id === ingredient._id )
                                    ? (
                                        <Button
                                            onClick={() => onClickIngredient( ingredient )}
                                            text="Substitute"
                                        />
                                    )
                                    : null
                                }
                            </div>
                        </React.Fragment>
                    ),
                ) }
            </div>
        </div>
    );
}

IngredientsTable.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape( {
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            unit: PropTypes.shape( {
                amount: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            } ),
        } ),
    ).isRequired,
    onClickIngredient: PropTypes.func.isRequired,
    substitutableIngredients: PropTypes.arrayOf(
        PropTypes.string,
    ).isRequired,
};

export default IngredientsTable;
