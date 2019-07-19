import React, { useCallback } from 'react';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { authorizeClient } from '../../services/foodo-api/oAuthService';
import { throwRequestParameterMissingError } from '../../utilities/errorHandler/errorHandler';

import SimpleView from '../../views/simpleView';
import Container from '../../components/container/container';
import Button from '../../components/button/button';
import Card from '../../components/card/card';

function OAuthContainer() {
    // decorates LoginContainer.handleSubmit function
    const handleSubmit = useCallback( async () => {
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
        await authorizeClient( clientId, state, redirectUri )
            // eslint-disable-next-line no-unused-vars
            .then( ( authorizationCode ) => {
                // Simulate an HTTP redirect
                window.location.replace( `${ redirectUri }?code=${ authorizationCode }&state=${ state }` );
            } );
        return true;
    }, [] );

    return (
        <SimpleView title={<h1>{i18n.t( KEYS.HEADERS.THIRD_PARTY_AUTHORIZATION )}</h1>}>
            <div>
                <Container>
                    <Card>
                        <p>
                            Do you want to authorize Alexa to use your Foodo information?
                        </p>
                        <Button label={KEYS.LABELS.AUTHORIZE} onClick={handleSubmit} primary />
                    </Card>
                </Container>
            </div>
        </SimpleView>
    );
}

export default OAuthContainer;
