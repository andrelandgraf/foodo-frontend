import React, { useContext, useCallback } from 'react';
import { cloneDeep } from 'lodash';

import { SUBSCRIPTION_LEVELS } from '../../hooks/useSubscriptionLevels';

import Button from '../../components/button/button';
import { UserStateContext } from '../../provider/UserStateProvider';

function Subscribe() {
    const { user, setUser } = useContext( UserStateContext );

    const subscribe = useCallback( () => {
        const updatedUser = cloneDeep( user );
        updatedUser.subscription = SUBSCRIPTION_LEVELS.BASIC;
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
                    <Button label="Subscribe" onClick={subscribe} primary classes="subscribe-button" />
                    <Button label="Not this time" onClick={subscribe} classes="subscribe-button" />
                </div>
            </div>
        </div>
    );
}

export default Subscribe;
