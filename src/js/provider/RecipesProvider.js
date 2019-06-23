/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

import { getRecipes } from '../services/foodo-api/recipe/recipesService';

const RecipesContext = React.createContext( {
    recipes: undefined,
    setRecipes: () => {},
} );

class RecipesProvider extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            recipes: [],
        };
    }

    componentDidMount() {
        getRecipes().then( recipes => this.setState( { recipes } ) );
    }

    setRecipes = recipes => this.setState( { recipes } );

    render() {
        const { children } = this.props;
        const { state } = this;
        const context = {
            setRecipes: this.setRecipes,
            ...state,
        };
        return (
            <RecipesContext.Provider value={context}>
                {children}
            </RecipesContext.Provider>
        );
    }
}

RecipesProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { RecipesContext, RecipesProvider };
