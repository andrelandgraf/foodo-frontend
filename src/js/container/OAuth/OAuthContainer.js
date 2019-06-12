import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { authorizeClient } from '../../services/userService';
import { throwRequestParameterMissingError } from '../../utilities/errorHandler/errorHandler';

import LoginContainer from '../Login/LoginContainer';

class OAuthContainer extends React.Component {
    // decorates LoginContainer.handleSubmit function
    handleSubmit = async ( username, password ) => {
        // see: https://developer.amazon.com/de/docs/account-linking/configure-authorization-code-grant.html
        // client_id, response_type, scope, redirect_uri
        const { search } = window.location;
        const urlParams = new URLSearchParams( search );
        const clientId = urlParams.get( 'client_id' );
        const state = urlParams.get( 'state' );
        const redirectUri = urlParams.get( 'redirect_uri' );
        if ( !clientId || !state || !redirectUri ) {
            throwRequestParameterMissingError();
        }
        await authorizeClient( username, password, clientId, state, redirectUri )
            // eslint-disable-next-line no-unused-vars
            .then( ( authorizationCode ) => {
                // Simulate an HTTP redirect
                window.location.replace( `${ redirectUri }?code=${ authorizationCode }&state=${ state }` );
            } );
        return true;
    }

    render() {
        return (
            <LoginContainer
                pageName={i18n.t( KEYS.HEADERS.THIRD_PARTY_AUTHORIZATION )}
                actionName={i18n.t( KEYS.LABELS.AUTHORIZE )}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default OAuthContainer;
