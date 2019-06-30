import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getAllergies } from '../services/foodo-api/user/profileService';

const AllergiesContext = React.createContext( {
    allergies: undefined,
    setAllergies: () => {},
} );

function AllergiesProvider( { children } ) {
    const [ allergies, setAllergies ] = useState( [] );

    useEffect( () => {
        getAllergies().then( a => setAllergies( a ) );
    }, [] );

    const context = {
        allergies,
        setAllergies,
    };

    return (
        <AllergiesContext.Provider value={context}>
            {children}
        </AllergiesContext.Provider>
    );
}

AllergiesProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { AllergiesContext, AllergiesProvider };
