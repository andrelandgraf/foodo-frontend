import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getUserRecipes } from '../services/foodo-api/recipe/recipesService';
import LOADING_STATUS from '../utilities/loadingStatus';

const UserRecipesContext = React.createContext( {
    userRecipes: undefined,
    fetchUserRecipes: () => {},
    status: '',
} );

function UserRecipesProvider( { children } ) {
    const [ userRecipes, setUserRecipes ] = useState();
    const [ status, setStatus ] = useState( LOADING_STATUS.IS_IDLE );

    const fetchUserRecipes = useCallback( () => {
        setStatus( LOADING_STATUS.IS_LOADING );
        getUserRecipes().then( ( recipes ) => {
            setUserRecipes( recipes );
            setStatus( LOADING_STATUS.HAS_SUCCEEDED );
        } );
    }, [] );

    const context = {
        userRecipes,
        fetchUserRecipes,
        status,
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
