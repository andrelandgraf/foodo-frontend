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
                .then( () => console.log( 'it worked' ) && clearInterval( interval ) && resolve() )
                .catch( ( err ) => {
                    console.log( 'retry' );
                    counter += 1;
                    const { status } = err.response;
                    if ( status !== 404 ) {
                        throw new Error( 'unexpected error while validating PayPal subscription' );
                    }
                    if ( counter > 10 ) {
                        clearInterval( interval );
                        reject();
                    }
                } );
        };
        interval = setInterval( checkSubscription, 1000 );
    },
);
