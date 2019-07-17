import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import RecipesContainer from '../container/Recipes/RecipesContainer';
import RecipesGridsContainer from '../container/Recipes/RecipesGridsContainer';

const HomeView = ( { user } ) => (
    <div className="container home-container">
        <h1 className="header">{i18n.t( KEYS.HEADERS.HOME_WELCOME, { name: user.username } )}</h1>
        <RecipesContainer />
        <RecipesGridsContainer />
    </div>

);

HomeView.propTypes = {
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
    } ).isRequired,
};

export default HomeView;
