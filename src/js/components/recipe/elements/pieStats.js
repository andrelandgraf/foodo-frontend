import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';
import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';
import useDeviceState from '../../../hooks/useDeviceState';


const PieStats = ( { totalRecipe } ) => {
    const [ isMobile ] = useDeviceState();
    const [ scale, setScale ] = useState( isMobile ? 200 : 300 );
    useEffect( () => {
        if ( isMobile ) {
            setScale( 250 );
        } else {
            setScale( 300 );
        }
    }, [ isMobile ] );

    const sumCals = totalRecipe.carbs + totalRecipe.fat + totalRecipe.protein;
    const relCarbs = Math.round( totalRecipe.carbs / sumCals * 100 );
    const relFat = Math.round( totalRecipe.fat / sumCals * 100 );
    const relProtein = Math.round( totalRecipe.protein / sumCals * 100 );

    const data = [
        { name: 'Carbs', value: relCarbs },
        { name: 'Fat', value: relFat },
        { name: 'Protein', value: relProtein },
    ];

    const COLORS = [ '#d4380d', '#FFBB28', '#00C49F' ];

    return (
        <div className="recipe-content-pie">
            <h2>{i18n.t( KEYS.LABELS.NUTRITION )}</h2>
            <PieChart width={scale} height={scale}>
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
