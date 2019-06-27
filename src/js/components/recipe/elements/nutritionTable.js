import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';


const NutritionTable = ( { ingredients } ) => {
    const totalWeight = ingredients.map(
        ingredient => ( ingredient.amount * ingredient.unit.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalCalories = ingredients.map(
        ingredient => ( ingredient.elements.KCal * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalFat = ingredients.map(
        ingredient => ( ingredient.elements.TotalFat * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalProtein = ingredients.map(
        ingredient => ( ingredient.elements.Protein * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalSalt = ingredients.map(
        ingredient => ( ingredient.elements.Salt * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    return (
        <div className="nutrition-table">
            <h2>{i18n.t( KEYS.LABELS.NUTRITION )}</h2>
            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Total</th>
                        <th>100g</th>
                        <th>400g</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Calories</td>
                        <td>
                            {totalCalories}
KCal
                        </td>
                        <td>
                            {( totalCalories / totalWeight * 100 ).toFixed( 1 )}
KCal
                        </td>
                        <td>
                            {( totalCalories / totalWeight * 400 ).toFixed( 1 )}
KCal
                        </td>
                        <td>
                            {( ( totalCalories / totalWeight * 400 ) * 100 / 2000 ).toFixed( 0 )}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Fat</td>
                        <td>
                            {totalFat}
g
                        </td>
                        <td>
                            {( totalFat / totalWeight * 100 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( totalFat / totalWeight * 400 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( ( totalFat / totalWeight * 400 ) * 100 / 70 ).toFixed( 0 )}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Proteins</td>
                        <td>
                            {totalProtein}
g
                        </td>
                        <td>
                            {( totalProtein / totalWeight * 100 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( totalProtein / totalWeight * 400 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( ( totalProtein / totalWeight * 400 ) * 100 / 50 ).toFixed( 0 )}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Salt</td>
                        <td>
                            {totalSalt}
g
                        </td>
                        <td>
                            {( totalSalt / totalWeight * 100 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( totalSalt / totalWeight * 400 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( ( totalSalt / totalWeight * 400 ) * 100 / 6 ).toFixed( 0 )}
%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};


NutritionTable.propTypes = {
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
};

export default NutritionTable;
