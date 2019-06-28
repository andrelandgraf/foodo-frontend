import React from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18next';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { KEYS } from '../../../utilities/internationalization/internationalization';

// %- reference based on https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:de:PDF

/*
const NutritionTable = ( { ingredients } ) =>

    let totalWeight = 0.0;
    let totalCalories = 0.0;
    let totalFat = 0.0;
    let totalSFA = 0.0;
    let totalCarbs = 0.0;
    let totalSugar = 0.0;
    let totalFiber = 0.0;
    let totalProtein = 0.0;
    let totalSalt = 0.0;

    for ( let i = 0; i < ingredients.length; i += 1 ) {
        totalWeight += 0 + ( ingredients[ i ].amount * ingredients[ i ].unit.amount
        ).toFixed( 1 );
        totalCalories += 0 + ( ingredients[ i ].elements.KCal * ingredients[ i ].amount
        ).toFixed( 1 );
        totalFat += 0 + ( ingredients[ i ].elements.TotalFat * ingredients[ i ].amount
        ).toFixed( 1 );
        totalSFA += 0 + ( ingredients[ i ].elements.SFA * ingredients[ i ].amount
        ).toFixed( 1 );
        totalCarbs += 0 + ( ingredients[ i ].elements.Carbohydrate * ingredients[ i ].amount
        ).toFixed( 1 );
        totalSugar += 0 + ( ingredients[ i ].elements.AddedSugars * ingredients[ i ].amount
        ).toFixed( 1 );
        totalFiber += 0 + ( ingredients[ i ].elements.DietaryFiber * ingredients[ i ].amount
        ).toFixed( 1 );
        totalProtein += 0 + ( ingredients[ i ].elements.Protein * ingredients[ i ].amount
        ).toFixed( 1 );
        totalSalt += 0 + ( ingredients[ i ].elements.Salt * ingredients[ i ].amount
        ).toFixed( 1 );
        console.log( totalSalt, ingredients[ i ].elements.Salt * ingredients[ i ].amount );
    } */

/*
    ingredients.forEach(
        ( ingredient ) => {
            totalWeight += ingredient.amount * ingredient.unit.amount,
            totalCalories += ingredient.elements.KCal * ingredient.amount,
            totalFat += ingredient.elements.TotalFat * ingredient.amount,
            totalSFA += ingredient.elements.SFA * ingredient.amount,
            totalCarbs += ingredient.elements.Carbohydrate * ingredient.amount,
            totalSugar += ingredient.elements.AddedSugars * ingredient.amount,
            totalFiber += ingredient.elements.DietaryFiber * ingredient.amount,
            totalProtein += ingredient.elements.Protein * ingredient.amount,
            totalSalt += ingredient.elements.Salt * ingredient.amount;
        },
    ); */

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
    const data = [
        {
            name: 'Calories',
            reference: ( 100 - ( totalCalories / totalWeight * 400 ) * 100 / 2000
            ).toFixed( 0 ),
            serving: ( ( totalCalories / totalWeight * 400 ) * 100 / 2000
            ).toFixed( 0 ),
        },
        {
            name: 'Fat', reference: Math.max( 0, ( 100 - ( totalFat / totalWeight * 400 ) * 100 / 70 ).toFixed( 0 ) ), serving: ( ( totalFat / totalWeight * 400 ) * 100 / 70 ).toFixed( 0 ),
        },
        {
            name: 'Saturated Fats', reference: Math.max( 0, ( 100 - ( totalSFA / totalWeight * 400 ) * 100 / 20 ).toFixed( 0 ) ), serving: ( ( totalSFA / totalWeight * 400 ) * 100 / 20 ).toFixed( 0 ),
        },
        {
            name: 'Carbohydrates', reference: Math.max( 0, ( 100 - ( totalCarbs / totalWeight * 400 ) * 100 / 260 ).toFixed( 0 ) ), serving: ( ( totalCarbs / totalWeight * 400 ) * 100 / 260 ).toFixed( 0 ),
        },
        {
            name: 'Sugar', reference: Math.max( 0, ( 100 - ( totalSugar / totalWeight * 400 ) * 100 / 90 ).toFixed( 0 ) ), serving: ( ( totalSugar / totalWeight * 400 ) * 100 / 90 ).toFixed( 0 ),
        },
        {
            name: 'Protein', reference: Math.max( 0, ( 100 - ( totalProtein / totalWeight * 400 ) * 100 / 50 ).toFixed( 0 ) ), serving: ( ( totalProtein / totalWeight * 400 ) * 100 / 50 ).toFixed( 0 ),
        },
        {
            name: 'Salt', reference: Math.max( 0, ( 100 - ( totalSalt / totalWeight * 400 ) * 100 / 6 ).toFixed( 0 ) ), serving: ( ( totalSalt / totalWeight * 400 ) * 100 / 6 ).toFixed( 0 ),
        },
    ];
    return (
        <div>
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
                                {( ( totalCalories / totalWeight * 400 ) * 100 / 2000
                                ).toFixed( 0 )}
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
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="serving" stackId="a" fill="#cf1322" />
                <Bar dataKey="reference" stackId="a" fill="#7cb305" />
            </BarChart>
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
