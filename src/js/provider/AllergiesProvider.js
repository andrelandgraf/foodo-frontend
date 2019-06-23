/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

import { getAllergies } from '../services/foodo-api/user/profileService';

const AllergiesContext = React.createContext( {
    ingredients: undefined,
    setIngredients: () => {},
} );

class AllergiesProvider extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            allergies: [],
        };
    }

    componentDidMount() {
        getAllergies().then( allergies => this.setState( { allergies } ) );
    }

    setAllergies = allergies => this.setState( { allergies } );

    render() {
        const { children } = this.props;
        const { state } = this;
        const context = {
            setAllergies: this.setAllergies,
            ...state,
        };
        return (
            <AllergiesContext.Provider value={context}>
                {children}
            </AllergiesContext.Provider>
        );
    }
}

AllergiesProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { AllergiesContext, AllergiesProvider };
