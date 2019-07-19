import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS, getLocale } from '../../utilities/internationalization/internationalization';

import { registerUser } from '../../services/foodo-api/user/userService';

import LoginContainer from '../Login/LoginContainer';

function RegistrationContainer( { setUser } ) {
    // decorates LoginContainer.handleSubmit function
    const handleSubmit = useCallback( async ( username, password ) => {
        const userObject = {
            username,
            password,
            locale: getLocale(),
        };
        await registerUser( userObject )
            .then( ( user ) => {
                setUser( user );
            } );
        return true;
    }, [] );

    return (
        <LoginContainer
            pageName={i18n.t( KEYS.LABELS.REGISTRATION )}
            actionName={i18n.t( KEYS.LABELS.REGISTER )}
            onSubmit={handleSubmit}
        />
    );
}

RegistrationContainer.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default RegistrationContainer;
