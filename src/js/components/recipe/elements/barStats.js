import React from 'react';
import PropTypes from 'prop-types';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
} from 'recharts';


const BarStats = ( { ingredients, origingredients } ) => {
    const sumRecipe = ( ingredient ) => {
        const totalRecipe = {
            weight: 0,
            calories: 0,
            fat: 0,
            sfa: 0,
            carbs: 0,
            sugar: 0,
            protein: 0,
            salt: 0,
            relativeCalories: 0,
            relativeFat: 0,
            relativeSfa: 0,
            relativeCarbs: 0,
            relativeSugar: 0,
            relativeProtein: 0,
            relativeSalt: 0,
        };

        const relativeValue = ( total, ref ) => ( total / totalRecipe.weight * 400 ) * 100 / ref;

        for ( let i = 0; i < ingredient.length; i += 1 ) {
            totalRecipe.weight += ingredient[ i ].amount * ingredient[ i ].unit.amount;
            totalRecipe.calories += ingredient[ i ].elements.KCal * ingredient[ i ].amount;
            totalRecipe.fat += ingredient[ i ].elements.TotalFat * ingredient[ i ].amount;
            totalRecipe.sfa += ingredient[ i ].elements.SFA * ingredient[ i ].amount;
            totalRecipe.carbs += ingredient[ i ].elements.Carbohydrate * ingredient[ i ].amount;
            totalRecipe.sugar += ingredient[ i ].elements.AddedSugars * ingredient[ i ].amount;
            totalRecipe.protein += ingredient[ i ].elements.Protein * ingredient[ i ].amount;
            totalRecipe.salt += ingredient[ i ].elements.Salt * ingredient[ i ].amount;
        }
        totalRecipe.relativeCalories = Math.round( relativeValue( totalRecipe.calories, 2000 ) );
        totalRecipe.relativeFat = Math.round( relativeValue( totalRecipe.fat, 70 ) );
        totalRecipe.relativeSfa = Math.round( relativeValue( totalRecipe.sfa, 20 ) );
        totalRecipe.relativeCarbs = Math.round( relativeValue( totalRecipe.carbs, 260 ) );
        totalRecipe.relativeSugar = Math.round( relativeValue( totalRecipe.sugar, 90 ) );
        totalRecipe.relativeProtein = Math.round( relativeValue( totalRecipe.protein, 50 ) );
        totalRecipe.relativeSalt = Math.round( relativeValue( totalRecipe.salt, 6 ) );
        return totalRecipe;
    };

    const totalRecipe = sumRecipe( ingredients );
    const totalOrigRecipe = sumRecipe( origingredients );

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
        <div className="BarStats">
            <BarChart
                width={800}
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
    origingredients: PropTypes.arrayOf(
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
