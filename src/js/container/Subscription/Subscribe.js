import React, {
    useState, useContext, useCallback, useLayoutEffect, useEffect,
} from 'react';
import { Redirect } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import foodo from '../../../img/foodo.png';

import { validateSubscription } from '../../services/foodo-api/user/subscription';

import { ACCESS_LEVELS } from '../../hooks/useUserHasAccessLevels';
import LOADING_STATUS from '../../utilities/loadingStatus';
import { getRedirectUrl } from '../../utilities/redirect';

import { UserStateContext } from '../../provider/UserStateProvider';

import Button from '../../components/button/button';
import Loader from '../../components/loading/loader';
import Message, { MESSAGE_TYPES } from '../../components/message/message';
import { AUTH_ROUTES } from '../App/App';

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
            // eslint-disable-next-line no-unused-vars
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
                    .catch( () => {
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
        <div className="subscribe-box">
            <h2>What is this?</h2>
            <div className="subscribe-box-foodo">
                <img alt="foodo" src={foodo} />
                <p>
                You cook a lot and we like that!
                But we have to store your data and compute your recipes.
                We hate advertisment and want to offer you a clean User Interface.
                In order to do so we would love a tiny subscription for our Services.
                What do you think? Sounds fair?
                </p>
            </div>
            <h3>We want you!</h3>
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
        </div>
    );

    if ( paypalState === LOADING_STATUS.HAS_SUCCEEDED || ( user && user.skippedSubscription ) ) {
        let redirect = getRedirectUrl();
        if ( redirect === AUTH_ROUTES.SUBSCRIBE ) {
            redirect = AUTH_ROUTES.HOME;
        }
        return <Redirect push to={redirect} />;
    }

    return (
        <>
            { paypalState === LOADING_STATUS.IS_LOADING
                ? <Loader message="Validating your payment" fullpage />
                : subscriptionPage }
        </>
    );
}

export default Subscribe;
