import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { registerUser } from '../../services/userService';

import LoginContainer from '../Login/LoginContainer';

class RegistrationContainer extends React.Component {
    // decorates LoginContainer.handleSubmit function
    handleSubmit = async ( username, password ) => {
        const { setUser } = this.props;
        await registerUser( username, password )
            .then( ( user ) => {
                setUser( user );
            } );
        return true;
    }

    render() {
        return (
            <LoginContainer
                pageName={i18n.t( KEYS.LABELS.REGISTRATION )}
                actionName={i18n.t( KEYS.LABELS.REGISTER )}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

RegistrationContainer.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default RegistrationContainer;
