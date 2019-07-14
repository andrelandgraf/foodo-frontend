/* eslint-disable no-unused-vars */
import React, {
    useState, useContext, useCallback, useLayoutEffect, useEffect,
} from 'react';
import { cloneDeep } from 'lodash';

import { ACCESS_LEVELS } from '../../hooks/useUserHasAccessLevels';

import Button from '../../components/button/button';
import { UserStateContext } from '../../provider/UserStateProvider';
import { validateSubscription } from '../../services/foodo-api/user/subscription';
import Loader from '../../components/loading/loader';
import LOADING_STATUS from '../../utilities/loadingStatus';
import Message, { MESSAGE_TYPES } from '../../components/message/message';

function Subscribe() {
    const { user, setUser } = useContext( UserStateContext );
    const [ paypalState, setPaypalState ] = useState( LOADING_STATUS.IS_IDLE );
    const [ message, setMessage ] = useState( '' );
    const [ messageType, setMessageType ] = useState();

    useEffect( () => {
        if ( paypalState === LOADING_STATUS.HAS_FAILED ) {
            setMessage( 'Unfortunately, we could not validate your payment. Please try again' );
            setMessageType( MESSAGE_TYPES.ERR );
        } else {
            setMessage( '' );
            setMessageType( undefined );
        }
    }, [ paypalState ] );

    useLayoutEffect( () => {
        // eslint-disable-next-line no-undef
        paypal.Buttons( {
            style: {
                color: 'white',
                shape: 'rect',
                label: 'pay',
                height: 40,
            },
            createSubscription( data, actions ) {
                return actions.subscription.create( {
                    plan_id: process.env.REACT_APP_PAYPAL_SUB_PLAN_ID,
                } );
            },
            onApprove( data, actions ) {
                // we need approval from our backend first
                setPaypalState( LOADING_STATUS.IS_LOADING );
                const subscriptionId = data.subscriptionID;
                validateSubscription( subscriptionId )
                    .then( () => {
                        setPaypalState( LOADING_STATUS.HAS_SUCCEEDED );
                        const updatedUser = cloneDeep( user );
                        updatedUser.level = ACCESS_LEVELS.SUBSCRIBED;
                        setUser( updatedUser );
                    } )
                    .catch( ( err ) => {
                        setPaypalState( LOADING_STATUS.HAS_FAILED );
                    } );
            },
        } ).render( '#paypal-button-container' );
    }, [] );

    const skip = useCallback( () => {
        const updatedUser = cloneDeep( user );
        updatedUser.skippedSubscription = true;
        setUser( updatedUser );
    }, [] );

    const subscriptionPage = (
        <>
            <h2>Why are you here?</h2>
            {
                message
                    ? (
                        <Message
                            message={message}
                            type={messageType}
                            onResolve={() => setMessage( '' )}
                        />
                    )
                    : null
            }
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
        </>
    );

    return (
        <div className="subscribe-box">
            { paypalState === LOADING_STATUS.IS_LOADING ? <Loader /> : subscriptionPage }
        </div>
    );
}

export default Subscribe;
