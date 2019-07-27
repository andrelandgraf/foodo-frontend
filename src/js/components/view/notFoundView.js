import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import SimpleView from './simpleView';

const NotFoundView = () => (
    <SimpleView title={<h1>{i18n.t( KEYS.HEADERS.PAGE_NOT_FOUND )}</h1>}>
        <div className="center">
            {i18n.t( KEYS.MESSAGES.PAGE_NOT_FOUND_MESSAGE )}
        </div>
    </SimpleView>
);

export default NotFoundView;
