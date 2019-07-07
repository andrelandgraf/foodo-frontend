import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getRecipes } from '../services/foodo-api/recipe/recipesService';

const RecipesContext = React.createContext( {
    recipes: [],
    setRecipes: () => {},
} );

function RecipesProvider( { children } ) {
    const [ recipes, setRecipes ] = useState( [] );

    useEffect( () => { getRecipes().then( r => setRecipes( r ) ); }, [] );

    const context = {
        recipes,
        setRecipes,
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
