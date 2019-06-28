import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

import edit from '../../../../img/add-list.svg';

import Button from '../../button/button';
import ImageButton from '../../button/imageButton';

function IngredientsTable( {
    ingredients, substitutableIngredients, onClickIngredient, onEdit,
} ) {
    const unitToLabel = ( unit ) => {
        switch ( unit ) {
        case 'gramm': return 'g';
        case 'ml': return unit;
        default: return unit;
        }
    };

    return (
        <div className="ingredients-container">
            <div className="header-container">
                <h2>{i18n.t( KEYS.LABELS.INGREDIENTS )}</h2>
                <ImageButton
                    src={edit}
                    alt="edit ingredients"
                    id="edit-ingredients"
                    onClick={onEdit}
                    classes="edit-ingredients-button"
                />
            </div>
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
    onEdit: PropTypes.func.isRequired,
    substitutableIngredients: PropTypes.arrayOf(
        PropTypes.string,
    ).isRequired,
};

export default IngredientsTable;
