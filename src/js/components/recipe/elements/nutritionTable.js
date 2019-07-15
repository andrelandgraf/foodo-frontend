import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';

// reference based on https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:de:PDF
const NutritionTable = ( { totalRecipe } ) => {
    const round = number => ( number < 1
        ? Math.round( number * 100 ) / 100 : Math.round( number * 10 ) / 10 );
        // 2 digits if below 1, else 1
    const to100 = nutrient => ( nutrient / totalRecipe.weight * 100 );
    const to400 = nutrient => ( nutrient / totalRecipe.weight * 400 );
    return (
        <div className="recipe-nutrition-table">
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
                            {Math.round( to100( totalRecipe.calories ) )}
KCal
                        </td>
                        <td>
                            {Math.round( to400( totalRecipe.calories ) )}
KCal
                        </td>
                        <td rowSpan="2">
                            {totalRecipe.relativeCalories}
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
                            {round( totalRecipe.fat )}
g
                        </td>
                        <td>
                            {round( to100( totalRecipe.fat ) ) }
g
                        </td>
                        <td>
                            {round( to400( totalRecipe.fat ) )}
g
                        </td>
                        <td>
                            {totalRecipe.relativeFat}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Saturated</td>
                        <td>
                            {round( totalRecipe.sfa )}
g
                        </td>
                        <td>
                            {round( to100( totalRecipe.sfa ) ) }
g
                        </td>
                        <td>
                            {round( to400( totalRecipe.sfa ) ) }
g
                        </td>
                        <td>
                            {totalRecipe.relativeSfa}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Carbohydrates</td>
                        <td>
                            {round( totalRecipe.carbs )}
g
                        </td>
                        <td>
                            {round( to100( totalRecipe.carbs ) )}
g
                        </td>
                        <td>
                            {round( to400( totalRecipe.carbs ) )}
g
                        </td>
                        <td>
                            {totalRecipe.relativeCarbs}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Sugar</td>
                        <td>
                            {round( totalRecipe.sugar )}
g
                        </td>
                        <td>
                            {round( to100( totalRecipe.sugar ) )}
g
                        </td>
                        <td>
                            {round( to400( totalRecipe.sugar ) )}
g
                        </td>
                        <td>
                            {totalRecipe.relativeSugar}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Fiber</td>
                        <td>
                            {round( totalRecipe.fiber )}
g
                        </td>
                        <td>
                            {round( to100( totalRecipe.fiber ) )}
g
                        </td>
                        <td>
                            {round( to400( totalRecipe.fiber ) )}
g
                        </td>
                        <td />
                    </tr>
                    <tr>
                        <td>Proteins</td>
                        <td>
                            {round( totalRecipe.protein )}
g
                        </td>
                        <td>
                            {round( to100( totalRecipe.protein ) )}
g
                        </td>
                        <td>
                            {round( to400( totalRecipe.protein ) )}
g
                        </td>
                        <td>
                            {totalRecipe.relativeProtein}
%
                        </td>
                    </tr>
                    <tr>
                        <td>Salt</td>
                        <td>
                            {round( totalRecipe.salt )}
g
                        </td>
                        <td>
                            {round( to100( totalRecipe.salt ) )}
g
                        </td>
                        <td>
                            {round( to400( totalRecipe.salt ) )}
g
                        </td>
                        <td>
                            {totalRecipe.relativeSalt}
%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

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
