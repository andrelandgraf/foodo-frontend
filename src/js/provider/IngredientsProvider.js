/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { getIngredients } from '../services/foodo-api/ingredient/ingredientsService';

const IngredientsContext = React.createContext( {
    ingredients: undefined,
    setIngredients: () => {},
} );

class IngredientsProvider extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            ingredients: [],
        };
    }

    componentDidMount() {
        getIngredients().then( ingredients => this.setState( { ingredients } ) );
    }

    setIngredients = ingredients => this.setState( { ingredients } );

    render() {
        const { children } = this.props;
        const { state } = this;
        const context = {
            setIngredients: this.setIngredients,
            ...state,
        };
        return (
            <IngredientsContext.Provider value={context}>
                {children}
            </IngredientsContext.Provider>
        );
    }
}

IngredientsProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { IngredientsContext, IngredientsProvider };
