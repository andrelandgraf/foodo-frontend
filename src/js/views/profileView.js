import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import GoalsContainer from '../container/Goals/GoalsContainer';
import LifestylesContainer from '../container/Lifestyles/LifestylesContainer';
import DislikesContainer from '../container/Dislikes/DislikesContainer';
import AllergiesContainer from '../container/Allergies/AllergiesContainer';
import { IngredientsContext } from '../provider/IngredientsProvider';
import { GoalsLifestylesContext } from '../provider/GoalsLifestylesProvider';
import { AllergiesContext } from '../provider/AllergiesProvider';

// eslint-disable-next-line no-unused-vars
const ProfileView = () => (
    <div className="container profile-container">
        <h1>{i18n.t( KEYS.HEADERS.PROFILE_TITLE )}</h1>

        <GoalsLifestylesContext.Consumer>
            { ( { goals } ) => <GoalsContainer goals={goals} /> }
        </GoalsLifestylesContext.Consumer>

        <GoalsLifestylesContext.Consumer>
            { ( { lifestyles } ) => <LifestylesContainer lifestyles={lifestyles} /> }
        </GoalsLifestylesContext.Consumer>

        <IngredientsContext.Consumer>
            {ingredientsContext => <DislikesContainer ingredientsContext={ingredientsContext} />}
        </IngredientsContext.Consumer>

        <AllergiesContext.Consumer>
            {( { allergies } ) => <AllergiesContainer allergies={allergies} />}
        </AllergiesContext.Consumer>
    </div>
);

export default ProfileView;
