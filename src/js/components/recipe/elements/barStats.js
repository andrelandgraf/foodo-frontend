import React from 'react';
import PropTypes from 'prop-types';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const BarStats = ( { ingredients } ) => {
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
    /* const totalFiber = ingredients.map(
        ingredient => ( ingredient.elements.DietaryFiber * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 ); */
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
        <div className="BarStats">
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

BarStats.propTypes = {
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

export default BarStats;
