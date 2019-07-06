import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserRecipes } from '../services/foodo-api/recipe/recipesService';

const UserRecipesContext = React.createContext( {
    userRecipes: undefined,
    setUserRecipe: () => {},
} );

function UserRecipesProvider( { children } ) {
    const [ userRecipes, setUserRecipes ] = useState();
    const context = {
        userRecipes,
        setUserRecipes,
    };

    useEffect( () => { getUserRecipes().then( recipes => setUserRecipes( recipes ) ); }, [] );

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
