import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import GoalsContainer from '../container/Goals/GoalsContainer';
import LifestylesContainer from '../container/Lifestyles/LifestylesContainer';
import DislikesContainer from '../container/Dislikes/DislikesContainer';
import AllergiesContainer from '../container/Allergies/AllergiesContainer';

// eslint-disable-next-line no-unused-vars
const ProfileView = () => (
    <div className="container profile-container">
        <h1>{ i18n.t( KEYS.HEADERS.PROFILE_TITLE ) }</h1>
        <GoalsContainer />
        <LifestylesContainer />
        <DislikesContainer />
        <AllergiesContainer />
    </div>
);

export default ProfileView;
