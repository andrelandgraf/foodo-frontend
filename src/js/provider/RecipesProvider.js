import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getRecipes } from '../services/foodo-api/recipe/recipesService';
import LOADING_STATUS from '../utilities/loadingStatus';

const RecipesContext = React.createContext( {
    recipes: [],
    status: '',
} );

function RecipesProvider( { children } ) {
    const [ recipes, setRecipes ] = useState( [] );
    const [ status, setStatus ] = useState( LOADING_STATUS.IS_IDLE );

    useEffect( () => {
        setStatus( LOADING_STATUS.IS_LOADING );
        getRecipes().then( ( r ) => {
            setRecipes( r );
            setStatus( LOADING_STATUS.HAS_SUCCEEDED );
        } );
    }, [] );

    const context = {
        recipes,
        status,
    };

    return (
        <RecipesContext.Provider value={context}>
            {children}
        </RecipesContext.Provider>
    );
}

RecipesProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { RecipesContext, RecipesProvider };
