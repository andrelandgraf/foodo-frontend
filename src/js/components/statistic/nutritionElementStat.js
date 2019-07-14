import React from 'react';
import PropTypes from 'prop-types';
import {
    RadialBarChart, RadialBar, Tooltip,
} from 'recharts';

// eslint-disable-next-line no-unused-vars
const NutritionElementStat = ( { data, goodNutritionElement } ) => {
    console.log( data );
    console.log( goodNutritionElement );
    return (
        <div>
            <h2>{data.name}</h2>
            <RadialBarChart
                startAngle={goodNutritionElement ? 180 : 0}
                endAngle={goodNutritionElement ? 0 : 180}
                width={730}
                height={250}
                innerRadius="40%"
                outerRadius="80%"
                data={[ {
                    diff: data.originalValue - data.userValue,
                    rest: data.userValue / 10,
                } ]}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="10%" stopColor="#ff0000" stopOpacity={0.8} />
                        <stop offset="90%" stopColor="#00ff00" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <RadialBar stackId="a" fill="url(#colorUv)" background={{ fill: '#eee' }} dataKey="diff" />
                <RadialBar stackId="a" fill="#eee" dataKey="rest" />
                <Tooltip />
            </RadialBarChart>
            <span>
                {goodNutritionElement ? 'gained' : 'reduced'}
                {' '}
                {data.originalValue - data.userValue}
                g
            </span>
        </div>

    );
};

NutritionElementStat.propTypes = {
    data: PropTypes.shape( {
        name: PropTypes.string.isRequired,
        userValue: PropTypes.number.isRequired,
        originalValue: PropTypes.number.isRequired,
    } ).isRequired,
    goodNutritionElement: PropTypes.bool.isRequired,
};

export default NutritionElementStat;
