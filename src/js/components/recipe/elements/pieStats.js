import React from 'react';
import PropTypes from 'prop-types';

import {
    PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';

const PieStats = ( { totalRecipe } ) => {
    const sumCals = totalRecipe.carbs + totalRecipe.fat + totalRecipe.protein;
    const relCarbs = Math.round( totalRecipe.carbs / sumCals * 100 );
    const relFat = Math.round( totalRecipe.fat / sumCals * 100 );
    const relProtein = Math.round( totalRecipe.protein / sumCals * 100 );

    const data = [
        { name: 'Carbs', value: relCarbs },
        { name: 'Fat', value: relFat },
        { name: 'Protein', value: relProtein },
    ];


    console.log( totalRecipe );
    console.log( totalRecipe.calories );
    /*
    const data = [
        { name: 'Carbs', value: Math.round( totalRecipe.carbs / totalRecipe.weight ) },
        { name: 'Fat', value: Math.round( totalRecipe.fat / totalRecipe.weight ) },
        { name: 'Protein', value: Math.round( totalRecipe.protein / totalRecipe.weight ) },
    ];
    */

    const COLORS = [ '#d4380d', '#FFBB28', '#00C49F' ];

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
        </div>
    );
};

PieStats.propTypes = {
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

export default PieStats;
