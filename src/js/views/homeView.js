import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

const HomeView = ( { user } ) => (
    <div className="container">
        <div className="center">
            <h1>{ i18n.t( KEYS.HEADERS.HOME_WELCOME, { name: user.username } ) }</h1>
        </div>
    </div>
);

HomeView.propTypes = {
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    } ).isRequired,
};

export default HomeView;
