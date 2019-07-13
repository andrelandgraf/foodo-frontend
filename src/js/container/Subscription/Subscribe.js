/* eslint-disable no-unused-vars */
import React, { useContext, useCallback, useLayoutEffect } from 'react';
import { cloneDeep } from 'lodash';

import { ACCESS_LEVELS } from '../../hooks/useUserHasAccessLevels';

import Button from '../../components/button/button';
import { UserStateContext } from '../../provider/UserStateProvider';

function Subscribe() {
    const { user, setUser } = useContext( UserStateContext );

    useLayoutEffect( () => {
        // eslint-disable-next-line no-undef
        paypal.Buttons( {
            createSubscription( data, actions ) {
                return actions.subscription.create( {
                    plan_id: 'P-2UF78835G6983425GLSM44MA',

                } );
            },

            onApprove( data, actions ) {
                const updatedUser = cloneDeep( user );
                updatedUser.level = ACCESS_LEVELS.SUBSCRIBED;
                setUser( updatedUser );
                const subId = data.subscriptionID;
                // sent to backend with auth token
            },
        } ).render( '#paypal-button-container' );
    }, [] );

    const skip = useCallback( () => {
        const updatedUser = cloneDeep( user );
        updatedUser.skippedSubscription = true;
        setUser( updatedUser );
    }, [] );

    return (
        <div className="container subscribe">
            <div className="subscribe-box">
                <h2>Subscribe</h2>
                <p>
                You cook a lot and we like that!
                But we have to store your data and compute your recipes.
                We hate advertisment and want to offer you a clean User Interface.
                In order to do so we would love a tiny subscription for our Services.
                What do you think? Sounds fair?
                </p>
                <div>
                    <div id="paypal-button-container" />
                    <Button label="Not this time" onClick={skip} classes="subscribe-button" />
                </div>
            </div>
        </div>
    );
}

export default Subscribe;
