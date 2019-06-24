import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

import Button from '../../button/button';

const IngredientsTable = ( { ingredients, substitutableIngredients, onClickIngredient } ) => (
    <div>
        <h2>{i18n.t( KEYS.LABELS.INGREDIENTS )}</h2>
        <table>
            <tbody>
                { ingredients.map(
                    ingredient => (
                        <tr key={ingredient.key}>
                            <td>
                                {ingredient.amount * ingredient.unit.amount}
                            </td>
                            <td>
                                {ingredient.unit.name}
                            </td>
                            <td>{ ingredient.label}</td>
                            <td>
                                { substitutableIngredients.find( id => id === ingredient._id )
                                    ? (
                                        <Button
                                            onClick={() => onClickIngredient( ingredient )}
                                            text="Substitute"
                                        />
                                    )
                                    : null
                                }
                            </td>
                        </tr>
                    ),
                )}
            </tbody>
        </table>
    </div>
);

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
