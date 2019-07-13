import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';
import { unitToLabel } from '../../../utilities/units';

import pencil from '../../../../img/pencil.svg';

import Button from '../../button/button';
import ImageButton from '../../button/imageButton';

function IngredientsTable( {
    ingredients, substitutableIngredients, onClickSubstitute, onClickRevert, onEdit,
} ) {
    return (
        <div className="recipe-content-ingredients">
            <div className="recipe-content-ingredients-header">
                <h2>{i18n.t( KEYS.LABELS.INGREDIENTS )}</h2>
                <ImageButton
                    src={pencil}
                    alt="edit ingredients"
                    id="edit-ingredients"
                    onClick={onEdit}
                    classes="recipe-content-ingredients-header-button"
                />
            </div>
            <div className="recipe-content-ingredients-table">
                { ingredients.map(
                    ingredient => (
                        <React.Fragment key={ingredient.key}>
                            <span className="recipe-content-ingredients-table-amount">
                                { +( ingredient.amount * ingredient.unit.amount ).toFixed( 2 ) }
                            </span>
                            <span>
                                {unitToLabel( ingredient.unit.name )}
                            </span>
                            <span className="recipe-content-ingredients-table-label">
                                { ingredient.label}
                            </span>
                            <div>
                                {substitutableIngredients.find( id => id === ingredient._id )
                                    ? (
                                        <Button
                                            onClick={() => onClickSubstitute( ingredient )}
                                            label="Substitute"
                                        />
                                    )
                                    : null
                                }
                                {ingredient.substitutionFor
                                    ? (
                                        <Button
                                            onClick={() => onClickRevert( ingredient )}
                                            label="Revert"
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
    onClickSubstitute: PropTypes.func.isRequired,
    onClickRevert: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    substitutableIngredients: PropTypes.arrayOf(
        PropTypes.string,
    ).isRequired,
};

export default IngredientsTable;
