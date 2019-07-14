import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LOADING_STATUS from '../utilities/loadingStatus';

const UserRecipeContext = React.createContext( {
    userRecipe: undefined,
    setUserRecipe: () => {},
    status: '',
    setStatus: () => {},
} );

function UserRecipeProvider( { children } ) {
    const [ userRecipe, setUserRecipe ] = useState();
    const [ status, setStatus ] = useState( LOADING_STATUS.IS_IDLE );

    const context = {
        userRecipe,
        setUserRecipe,
        status,
        setStatus,
    };

    return (
        <UserRecipeContext.Provider value={context}>
            {children}
        </UserRecipeContext.Provider>
    );
}

UserRecipeProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { UserRecipeContext, UserRecipeProvider };
