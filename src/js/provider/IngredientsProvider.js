import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getIngredients } from '../services/foodo-api/ingredient/ingredientsService';

const IngredientsContext = React.createContext( {
    ingredients: undefined,
    setIngredients: () => {},
} );

function IngredientsProvider( { children } ) {
    const [ ingredients, setIngredients ] = useState( [] );

    useEffect( () => {
        getIngredients().then( i => setIngredients( i ) );
    }, [] );

    const context = {
        ingredients,
        setIngredients,
    };

    return (
        <IngredientsContext.Provider value={context}>
            {children}
        </IngredientsContext.Provider>
    );
}

IngredientsProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { IngredientsContext, IngredientsProvider };
