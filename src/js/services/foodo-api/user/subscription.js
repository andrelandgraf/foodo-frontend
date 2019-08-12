import { putRequest } from '../httpService';
import { ENDPOINTS } from '../api';

export const subscribe = subscriptionId => putRequest(
    ENDPOINTS.SUBSCRIPTION, { subscriptionId },
);

/**
 * Paypal returns a onSuccess subscriptionId if the process was successful,
 * however to make sure that the user did not fake any events via Browser,
 * we wait for the Paypal Subscription hook in the backend to be called by Paypal as well
 * and therefore we ping the backend until we receive a positive feedback before we
 * validate the Subscirption in the Frontend.
 * @param subscriptionId returned by the paypal button click callback function
 */
export const validateSubscription = subscriptionId => new Promise(
    ( resolve, reject ) => {
        let interval;
        let counter = 0;
        const checkSubscription = () => {
            subscribe( subscriptionId )
                .then( () => {
                    clearInterval( interval );
                    resolve();
                } )
                .catch( ( err ) => {
                    if ( err.response && err.response.status === 404 ) {
                        counter += 1;
                        if ( counter > 10 ) {
                            clearInterval( interval );
                            reject();
                        }
                    } else {
                        throw new Error( 'unexpected error while validating PayPal subscription' );
                    }
                } );
        };
        interval = setInterval( checkSubscription, 10000 );
    },
);
