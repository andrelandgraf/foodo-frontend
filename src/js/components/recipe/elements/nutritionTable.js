import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

// %- reference based on https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:de:PDF
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
    const totalSFA = ingredients.map(
        ingredient => ( ingredient.elements.SFA * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalCarbs = ingredients.map(
        ingredient => ( ingredient.elements.Carbohydrate * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalSugar = ingredients.map(
        ingredient => ( ingredient.elements.AddedSugars * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalFiber = ingredients.map(
        ingredient => ( ingredient.elements.DietaryFiber * ingredient.amount ),
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
                        <td>Saturated</td>
                        <td>
                            {totalSFA}
g
                        </td>
                        <td>
                            {( totalSFA / totalWeight * 100 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( totalSFA / totalWeight * 400 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( ( totalSFA / totalWeight * 400 ) * 100 / 20 ).toFixed( 0 )}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Carbohydrates</td>
                        <td>
                            {totalCarbs}
g
                        </td>
                        <td>
                            {( totalCarbs / totalWeight * 100 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( totalCarbs / totalWeight * 400 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( ( totalCarbs / totalWeight * 400 ) * 100 / 260 ).toFixed( 0 )}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Sugar</td>
                        <td>
                            {totalSugar}
g
                        </td>
                        <td>
                            {( totalSugar / totalWeight * 100 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( totalSugar / totalWeight * 400 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( ( totalSugar / totalWeight * 400 ) * 100 / 90 ).toFixed( 0 )}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Fiber</td>
                        <td>
                            {totalFiber}
g
                        </td>
                        <td>
                            {( totalFiber / totalWeight * 100 ).toFixed( 1 )}
g
                        </td>
                        <td>
                            {( totalFiber / totalWeight * 400 ).toFixed( 1 )}
g
                        </td>
                        <td />
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
