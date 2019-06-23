import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import RecipesContainer from '../container/Recipes/RecipesContainer';
import { RecipesContext } from '../provider/RecipesProvider';

const HomeView = ( { user } ) => (
    <div className="container home-container">
        <h1>{i18n.t( KEYS.HEADERS.HOME_WELCOME, { name: user.username } )}</h1>
        <RecipesContext.Consumer>
            { ( { recipes } ) => <RecipesContainer user={user} recipes={recipes} />}
        </RecipesContext.Consumer>
    </div>

);

HomeView.propTypes = {
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    } ).isRequired,
};

export default HomeView;
