import React, { useContext, useCallback } from 'react';
import { cloneDeep } from 'lodash';

import { ACCESS_LEVELS } from '../../hooks/useUserHasAccessLevels';

import Button from '../../components/button/button';
import { UserStateContext } from '../../provider/UserStateProvider';

function Subscribe() {
    const { user, setUser } = useContext( UserStateContext );

    const subscribe = useCallback( () => {
        const updatedUser = cloneDeep( user );
        updatedUser.level = ACCESS_LEVELS.SUBSCRIBED;
        setUser( updatedUser );
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
                    <Button label="Subscribe" onClick={subscribe} primary classes="subscribe-button" />
                    <Button label="Not this time" onClick={skip} classes="subscribe-button" />
                </div>
            </div>
        </div>
    );
}

export default Subscribe;
