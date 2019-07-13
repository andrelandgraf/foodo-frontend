import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import Subscribe from '../container/Subscription/Subscribe';

const SubscribeView = () => (
    <div className="container">
        <div className="center">
            <h1>{i18n.t( KEYS.HEADERS.SUBSCRIBE )}</h1>
            <Subscribe />
        </div>
    </div>
);

export default SubscribeView;
