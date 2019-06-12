import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

const NotFoundView = () => (
    <div className="container">
        <div className="center">
            <h1>{ i18n.t( KEYS.HEADERS.PAGE_NOT_FOUND ) }</h1>
            { i18n.t( KEYS.MESSAGES.PAGE_NOT_FOUND_MESSAGE ) }
        </div>
    </div>
);

export default NotFoundView;
