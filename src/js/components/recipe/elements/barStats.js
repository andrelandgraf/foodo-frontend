import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
} from 'recharts';
import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';
import useDeviceState from '../../../hooks/useDeviceState';

const BarStats = ( { totalRecipe, totalOrigRecipe } ) => {
    const [ isMobile, innerWidth ] = useDeviceState();
    const [ height, setHeight ] = useState( isMobile ? innerWidth / 2 : 300 );
    const [ width, setWidth ] = useState( isMobile ? innerWidth * 0.7 : 600 );
    useEffect( () => {
        if ( isMobile ) {
            setHeight( innerWidth / 2 );
            setWidth( innerWidth * 0.7 );
        } else {
            setHeight( 300 );
            setWidth( 600 );
        }
    }, [ isMobile, innerWidth ] );

    const chartData = ( name, user, orig ) => ( {
        name,
        reference: Math.max( 0, 100 - Math.max( user, orig ) ),
        difference: Math.abs( user - orig ),
        base: Math.min( user, orig ),
        diffcolor: ( user < orig ? '#73d13d' : '#ff4d4f' ),
    } );

    const data = [
        chartData( 'Calories', totalRecipe.relativeCalories, totalOrigRecipe.relativeCalories ),
        chartData( 'Fat', totalRecipe.relativeFat, totalOrigRecipe.relativeFat ),
        chartData( 'Saturated Fats', totalRecipe.relativeSfa, totalOrigRecipe.relativeSfa ),
        chartData( 'Carbs', totalRecipe.relativeCarbs, totalOrigRecipe.relativeCarbs ),
        chartData( 'Sugar', totalRecipe.relativeSugar, totalOrigRecipe.relativeSugar ),
        chartData( 'Protein', totalRecipe.relativeProtein, totalOrigRecipe.relativeProtein ),
        chartData( 'Salt', totalRecipe.relativeSalt, totalOrigRecipe.relativeSalt ),
    ];

    return (
        <div className="recipe-content-bar">
            <h2>{i18n.t( KEYS.LABELS.NUTRITION )}</h2>
            <BarChart
                width={width}
                height={height}
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
                <Bar dataKey="base" stackId="a" fill="#cf1322" />
                <Bar dataKey="difference" stackId="a" fill="#8884d8">
                    {
                        data.map( entry => <Cell fill={entry.diffcolor} /> )
                    }
                </Bar>
                <Bar dataKey="reference" stackId="a" fill="#389e0d" />
            </BarChart>
        </div>
    );
};

BarStats.propTypes = {
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
    totalOrigRecipe:
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

export default BarStats;
