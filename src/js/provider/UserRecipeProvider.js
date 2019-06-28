import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserRecipeContext = React.createContext( {
    userRecipe: undefined,
    setUserRecipe: () => {},
} );

function UserRecipeProvider( { children } ) {
    const [ userRecipe, setUserRecipe ] = useState();
    const context = {
        userRecipe,
        setUserRecipe,
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
