import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getGoals, getLifestyles } from '../services/foodo-api/user/profileService';

const GoalsLifestylesContext = React.createContext( {
    goals: undefined,
    setGoals: () => {},
    lifestyles: undefined,
    setLifestyles: () => {},
} );

function GoalsLifestylesProvider( { children } ) {
    const [ goals, setGoals ] = useState( [] );
    const [ lifestyles, setLifestyles ] = useState( [] );

    useEffect( () => { getGoals().then( g => setGoals( g ) ); }, [] );
    useEffect( () => { getLifestyles().then( l => setLifestyles( l ) ); }, [] );

    const context = {
        goals,
        lifestyles,
        setGoals,
        setLifestyles,
    };

    return (
        <GoalsLifestylesContext.Provider value={context}>
            {children}
        </GoalsLifestylesContext.Provider>
    );
}

GoalsLifestylesProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { GoalsLifestylesContext, GoalsLifestylesProvider };
