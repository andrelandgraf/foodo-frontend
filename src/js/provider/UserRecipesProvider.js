import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getUserRecipes } from '../services/foodo-api/recipe/recipesService';

const UserRecipesContext = React.createContext( {
    userRecipes: undefined,
    setUserRecipes: () => {},
    fetchUserRecipes: () => {},
} );

function UserRecipesProvider( { children } ) {
    const [ userRecipes, setUserRecipes ] = useState();

    const fetchUserRecipes = useCallback( () => getUserRecipes()
        .then( recipes => setUserRecipes( recipes ) ), [] );

    const context = {
        userRecipes,
        setUserRecipes,
        fetchUserRecipes,
    };

    useEffect( () => { fetchUserRecipes(); }, [] );

    return (
        <UserRecipesContext.Provider value={context}>
            {children}
        </UserRecipesContext.Provider>
    );
}

UserRecipesProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { UserRecipesContext, UserRecipesProvider };
