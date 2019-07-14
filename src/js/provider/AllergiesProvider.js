import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getAllergies } from '../services/foodo-api/user/profileService';
import LOADING_STATUS from '../utilities/loadingStatus';

const AllergiesContext = React.createContext( {
    allergies: [],
    status: '',
} );

function AllergiesProvider( { children } ) {
    const [ allergies, setAllergies ] = useState( [] );
    const [ status, setStatus ] = useState( LOADING_STATUS.IS_IDLE );

    useEffect( () => {
        setStatus( LOADING_STATUS.IS_LOADING );
        getAllergies().then( ( a ) => {
            setAllergies( a );
            setStatus( LOADING_STATUS.HAS_SUCCEEDED );
        } );
    }, [] );

    const context = {
        allergies,
        status,
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
