import React from 'react';
import ReactDOM from 'react-dom';

import './scss/styles.scss';
import App from './js/container/App/App';
import { UserStateProvider } from './js/provider/UserStateProvider';
import * as serviceWorker from './js/serviceWorker';

const application = (
    <UserStateProvider>
        <App />
    </UserStateProvider>
);

ReactDOM.render( application, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
