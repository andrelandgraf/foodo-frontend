/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

import { getGoals, getLifestyles } from '../services/foodo-api/user/profileService';

const GoalsLifestylesContext = React.createContext( {
    goals: undefined,
    setGoals: () => {},
    lifestyles: undefined,
    setLifestyles: () => {},
} );

class GoalsLifestylesProvider extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            goals: [],
            lifestyles: [],
        };
    }

    componentDidMount() {
        getGoals().then( goals => this.setState( { goals } ) );
        getLifestyles().then( lifestyles => this.setState( { lifestyles } ) );
    }

    setGoals = goals => this.setState( { goals } );

    setLifestyles= lifestyles => this.setState( { lifestyles } );

    render() {
        const { children } = this.props;
        const { state } = this;
        const context = {
            setGoals: this.setGoals,
            setLifestyles: this.setLifestyles,
            ...state,
        };
        return (
            <GoalsLifestylesContext.Provider value={context}>
                {children}
            </GoalsLifestylesContext.Provider>
        );
    }
}

GoalsLifestylesProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { GoalsLifestylesContext, GoalsLifestylesProvider };
