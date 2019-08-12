import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import GoalsContainer from './Goals/GoalsContainer';
import LifestylesContainer from './Lifestyles/LifestylesContainer';
import DislikesContainer from './Dislikes/DislikesContainer';
import AllergiesContainer from './Allergies/AllergiesContainer';
import Content from '../../components/content/content';
import SimpleView from '../../components/view/simpleView';

/**
 * Container for the profile page
 */
function ProfileContainer() {
    return (
        <SimpleView title={<h1>{i18n.t( KEYS.HEADERS.PROFILE_TITLE )}</h1>}>
            <Content classes="profile-container">
                <GoalsContainer />
                <LifestylesContainer />
                <DislikesContainer />
                <AllergiesContainer />
            </Content>
        </SimpleView>
    );
}

export default ProfileContainer;
