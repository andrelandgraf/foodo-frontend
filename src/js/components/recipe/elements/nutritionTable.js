import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

// reference based on https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:de:PDF
const NutritionTable = ( { totalRecipe } ) => (
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
                    <td rowSpan="2">Calories</td>
                    <td>
                        {Math.round( totalRecipe.calories )}
KCal
                    </td>
                    <td>
                        {Math.round( totalRecipe.calories / totalRecipe.weight * 100 )}
KCal
                    </td>
                    <td>
                        {Math.round( totalRecipe.calories / totalRecipe.weight * 400 )}
KCal
                    </td>
                    <td rowSpan="2">
                        {Math.round( totalRecipe.relativeCalories )}
%
                    </td>
                </tr>
                <tr>
                    <td>
                        {Math.round( totalRecipe.calories * 4.184 )}
kJ
                    </td>
                    <td>
                        {Math.round( totalRecipe.calories * 4.184 / totalRecipe.weight * 100 )}
kJ
                    </td>
                    <td>
                        {Math.round( totalRecipe.calories * 4.184 / totalRecipe.weight * 400 )}
kJ
                    </td>
                </tr>
                <tr>
                    <td>Fat</td>
                    <td>
                        {Math.round( totalRecipe.fat )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.fat / totalRecipe.weight * 100 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.fat / totalRecipe.weight * 400 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.fat )}
%
                    </td>
                </tr>
                <tr>
                    <td>Saturated</td>
                    <td>
                        {Math.round( totalRecipe.sfa )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.sfa / totalRecipe.weight * 100 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.sfa / totalRecipe.weight * 400 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.relativeSfa )}
%
                    </td>
                </tr>
                <tr>
                    <td>Carbohydrates</td>
                    <td>
                        {Math.round( totalRecipe.carbs )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.carbs / totalRecipe.weight * 100 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.carbs / totalRecipe.weight * 400 )}
g
                    </td>
                    <td>
                        {Math.round( ( totalRecipe.carbs / totalRecipe.weight * 400 ) * 100 / 260 )}
%
                    </td>
                </tr>
                <tr>
                    <td>Sugar</td>
                    <td>
                        {Math.round( totalRecipe.sugar )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.sugar / totalRecipe.weight * 100 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.sugar / totalRecipe.weight * 400 )}
g
                    </td>
                    <td>
                        {Math.round( ( totalRecipe.sugar / totalRecipe.weight * 400 ) * 100 / 90 )}
%
                    </td>
                </tr>
                <tr>
                    <td>Fiber</td>
                    <td>
                        {Math.round( totalRecipe.fiber )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.fiber / totalRecipe.weight * 100 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.fiber / totalRecipe.weight * 400 )}
g
                    </td>
                    <td />
                </tr>
                <tr>
                    <td>Proteins</td>
                    <td>
                        {Math.round( totalRecipe.protein )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.protein / totalRecipe.weight * 100 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.protein / totalRecipe.weight * 400 )}
g
                    </td>
                    <td>
                        {Math.round( ( totalRecipe.protein / totalRecipe.weight * 400 )
                             * 100 / 50 )}
%
                    </td>
                </tr>
                <tr>
                    <td>Salt</td>
                    <td>
                        {Math.round( totalRecipe.salt )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.salt / totalRecipe.weight * 100 )}
g
                    </td>
                    <td>
                        {Math.round( totalRecipe.salt / totalRecipe.weight * 400 )}
g
                    </td>
                    <td>
                        {Math.round( ( totalRecipe.salt / totalRecipe.weight * 400 ) * 100 / 6 )}
%
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

NutritionTable.propTypes = {
    totalRecipe:
        PropTypes.shape( {
            weight: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            sfa: PropTypes.number.isRequired,
            carbs: PropTypes.number.isRequired,
            sugar: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
            salt: PropTypes.number.isRequired,
            relativeCalories: PropTypes.number.isRequired,
            relativeFat: PropTypes.number.isRequired,
            relativeSfa: PropTypes.number.isRequired,
            relativeCarbs: PropTypes.number.isRequired,
            relativeSugar: PropTypes.number.isRequired,
            relativeProtein: PropTypes.number.isRequired,
            relativeSalt: PropTypes.number.isRequired,
        } ).isRequired,
};

export default NutritionTable;
