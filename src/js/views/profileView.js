import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

// eslint-disable-next-line no-unused-vars
const ProfileView = ( { user } ) => (
    <div className="container">
        <div className="center">
            <h1>{ i18n.t( KEYS.HEADERS.PROFILE_TITLE ) }</h1>
        </div>
    </div>
);

ProfileView.propTypes = {
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    } ).isRequired,
};

export default ProfileView;
