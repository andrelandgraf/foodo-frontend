import React, { useContext } from 'react';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { UserStateContext } from '../../provider/UserStateProvider';

import RecipesContainer from './Recipes/RecipesContainer';
import RecipesGridsContainer from './Recipes/RecipesGridsContainer';
import SimpleView from '../../components/view/simpleView';
import Content from '../../components/content/content';

/**
 * HomeContainer for the home page (loggedin landing page)
 */
function HomeContainer() {
    const { user } = useContext( UserStateContext );

    return (
        <SimpleView title={<h1>{i18n.t( KEYS.HEADERS.HOME_WELCOME, { name: user.username } )}</h1>}>
            <Content classes="home-container">
                <RecipesContainer />
                <RecipesGridsContainer />
            </Content>
        </SimpleView>
    );
}

export default HomeContainer;
