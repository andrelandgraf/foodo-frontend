import { putRequest } from '../httpService';
import { ENDPOINTS } from '../api';

export const subscribe = subscriptionId => putRequest(
    ENDPOINTS.SUBSCRIPTION, { subscriptionId },
);

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
