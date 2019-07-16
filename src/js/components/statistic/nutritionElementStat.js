import React from 'react';
import PropTypes from 'prop-types';
import {
    RadialBarChart, RadialBar, ResponsiveContainer,
} from 'recharts';

const NutritionElementStat = ( { data, goodNutritionElement } ) => {
    const round = number => ( Math.round( number * 10 ) / 10 )
        .toFixed( 1 );
    const positiveImprovement = goodNutritionElement ? data.originalValue - data.userValue < 0
        : data.originalValue - data.userValue > 0;
    const gain = ( goodNutritionElement && positiveImprovement )
        || ( !goodNutritionElement && !positiveImprovement );
    const diff = round( Math.abs( data.originalValue - data.userValue ) );

    return (
        <div className="statistics-block">
            <h2>{data.name}</h2>
            <ResponsiveContainer width="100%" height={220}>
                <RadialBarChart
                    startAngle={gain ? 180 : 0}
                    endAngle={gain ? 0 : 180}
                    innerRadius="45%"
                    outerRadius="80%"
                    data={[ {
                        diff,
                        rest: round( data.userValue ),
                    } ]}
                    margin={{
                        top: 0, right: 0, left: 0, bottom: -30,
                    }}
                >
                    <RadialBar stackId="a" fill={positiveImprovement ? 'green' : 'red'} background={{ fill: '#eee' }} dataKey="diff" />
                    <RadialBar stackId="a" fill="#eee" dataKey="rest" />
                </RadialBarChart>
            </ResponsiveContainer>
            <span className={positiveImprovement ? 'statistics-green' : 'statistics-red'}>
                {`${ gain ? 'gained' : 'reduced' } ${ diff }g`}
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
