// import PropTypes from 'prop-types';
import React from 'react';

import {
    PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';
/*
import {
    PieChart, Pie, Tooltip,
} from 'recharts';
*/

const PieStats = () => {
    /*
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
    const totalProtein = ingredients.map(
        ingredient => ( ingredient.elements.Protein * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );
    const totalSalt = ingredients.map(
        ingredient => ( ingredient.elements.Salt * ingredient.amount ),
    ).reduce( ( pv, cv ) => pv + cv, 0 ).toFixed( 1 );

     const data01 = [
        { name: 'Calories',
        value: ( ( totalCalories / totalWeight * 400 ) * 100 / 2000 ).toFixed( 0 ) },
        { name: 'Fat', value: ( ( totalFat / totalWeight * 400 ) * 100 / 70 ).toFixed( 0 ) },
        { name: 'SFA', value: ( ( totalSFA / totalWeight * 400 ) * 100 / 20 ).toFixed( 0 ) },
        { name: 'Carbs', value: ( ( totalCarbs / totalWeight * 400 ) * 100 / 260 ).toFixed( 0 ) },
        { name: 'Sugar', value: ( ( totalSugar / totalWeight * 400 ) * 100 / 90 ).toFixed( 0 ) },
        { name: 'Protein',
        value: ( ( totalProtein / totalWeight * 400 ) * 100 / 50 ).toFixed( 0 ) },
        { name: 'Salt', value: ( ( totalSalt / totalWeight * 400 ) * 100 / 6 ).toFixed( 0 ) },
    ];

    const data02 = [
        { name: 'Calories',
        value: ( ( totalCalories / totalWeight * 400 ) * 100 / 2000 ).toFixed( 0 ) },
        { name: 'Fat', value: ( ( totalFat / totalWeight * 400 ) * 100 / 70 ).toFixed( 0 ) },
        { name: 'SFA', value: ( ( totalSFA / totalWeight * 400 ) * 100 / 20 ).toFixed( 0 ) },
        { name: 'Carbs', value: ( ( totalCarbs / totalWeight * 400 ) * 100 / 260 ).toFixed( 0 ) },
        { name: 'Sugar', value: ( ( totalSugar / totalWeight * 400 ) * 100 / 90 ).toFixed( 0 ) },
        { name: 'Protein',
        value: ( ( totalProtein / totalWeight * 400 ) * 100 / 50 ).toFixed( 0 ) },
        { name: 'Salt', value: ( ( totalSalt / totalWeight * 400 ) * 100 / 6 ).toFixed( 0 ) },
    ];

    const data01 = [
        { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
    ];

    const data02 = [
        { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 },
    ];
    <div className="PieStats">
            <PieChart width={400} height={400}>
                <Pie dataKey="value"
                isAnimationActive={false} data={data01}
                cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                <Pie dataKey="value"
                data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                <Tooltip />
            </PieChart>
        </div>
    */

    const data = [
        { name: 'Calories', value: 400 },
        { name: 'Fat', value: 300 },
        { name: 'SFA', value: 300 },
        { name: 'Carbs', value: 200 },
        { name: 'Sugar', value: 200 },
        { name: 'Protein', value: 200 },
    ];

    const data1 = [
        { name: 'Carbs', value: 50 },
        { name: 'Fat', value: 30 },
        { name: 'Proteins', value: 20 },
    ];
    const COLORS = [ '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00C49F', '#FFBB28' ];

    return (
        <div className="PieStats">
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                >
                    {
                        data.map( ( entry, index ) => (
                            <Cell
                                key={entry}
                                fill={COLORS[ index % COLORS.length ]}
                            />
                        ) )
                    }
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
            </PieChart>
            <PieChart width={300} height={300}>
                <Pie
                    data={data1}
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={4}
                    dataKey="value"
                >
                    {
                        data.map( ( entry, index ) => (
                            <Cell
                                key={entry}
                                fill={COLORS[ index % COLORS.length ]}
                            />
                        ) )
                    }
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
            </PieChart>
        </div>
    );
};

/*
PieStats.propTypes = {
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
*/

export default PieStats;
