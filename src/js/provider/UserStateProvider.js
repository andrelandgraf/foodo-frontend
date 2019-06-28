import React, { useState } from 'react';
import PropTypes from 'prop-types';

// new context
const UserStateContext = React.createContext( {
    user: undefined,
    setUser: () => {},
} );

// corresponding provider component
function UserStateProvider( { children } ) {
    const [ user, setUser ] = useState();

    const context = {
        user,
        setUser,
    };

    return (
        <UserStateContext.Provider value={context}>
            {children}
        </UserStateContext.Provider>
    );
}

UserStateProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { UserStateContext, UserStateProvider };
