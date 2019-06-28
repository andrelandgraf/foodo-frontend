/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

// new context
const UserRecipeContext = React.createContext( {
    userRecipe: undefined,
    setUserRecipe: () => {},
} );

class UserRecipeProvider extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            userRecipe: undefined,
        };
    }

    setUserRecipe = userRecipe => this.setState( { userRecipe } );

    render() {
        const { children } = this.props;
        const { state } = this;
        const context = {
            setUserRecipe: this.setUserRecipe,
            ...state,
        };
        return (
            <UserRecipeContext.Provider value={context}>
                {children}
            </UserRecipeContext.Provider>
        );
    }
}

UserRecipeProvider.propTypes = {
    children: PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.node ),
        PropTypes.node,
    ] ).isRequired,
};

export { UserRecipeContext, UserRecipeProvider };
