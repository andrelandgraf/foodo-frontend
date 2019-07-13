import React from 'react';
import PropTypes from 'prop-types';
import {
    RadialBarChart, RadialBar, Legend, Tooltip,
} from 'recharts';

const NutritionElementStat = ( { data } ) => {
    console.log( data );
    return (
        <div>
            <RadialBarChart
                startAngle={180}
                endAngle={0}
                width={730}
                height={250}
                innerRadius="30%"
                outerRadius="80%"
                data={data}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="10%" stopColor="#ff0000" stopOpacity={0.8} />
                        <stop offset="90%" stopColor="#00ff00" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <RadialBar fill="url(#colorUv)" background clockWise dataKey="value" />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
                <Tooltip />
            </RadialBarChart>
            saved amoutn in g
        </div>

    );
};

NutritionElementStat.propTypes = {
    data: PropTypes.arrayOf( PropTypes.shape( {
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    } ) ).isRequired,
};

export default NutritionElementStat;
