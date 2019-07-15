import React from 'react';
import ReactDOM from 'react-dom';

import './scss/styles.scss';
import App from './js/container/App/App';
import { UserStateProvider } from './js/provider/UserStateProvider';
import * as serviceWorker from './js/serviceWorker';
import { LayoutProvider } from './js/provider/LayoutProvider';

const script = document.createElement( 'script' );
script.src = `https://www.paypal.com/sdk/js?client-id=${ process.env.REACT_APP_PAYPAL_CLIENT_KEY_ID }&vault=true`;
document.body.appendChild( script );

const application = (
    <LayoutProvider>
        <UserStateProvider>
            <App />
        </UserStateProvider>
    </LayoutProvider>
);

ReactDOM.render( application, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
