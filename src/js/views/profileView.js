import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import DislikesContainer from '../container/Dislikes/DislikesContainer';
import AllergiesContainer from '../container/Allergies/AllergiesContainer';

// eslint-disable-next-line no-unused-vars
const ProfileView = ( { user } ) => (
    <div className="container profile-container">
        <h1>{ i18n.t( KEYS.HEADERS.PROFILE_TITLE ) }</h1>
        <DislikesContainer user={user} />
        <AllergiesContainer user={user} />
    </div>
);

ProfileView.propTypes = {
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    } ).isRequired,
};

export default ProfileView;
