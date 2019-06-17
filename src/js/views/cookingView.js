import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import CookingContainer from '../container/Cooking/CookingContainer';

// eslint-disable-next-line no-unused-vars
const CookingView = ( { user, match } ) => (
    <div className="container home-container">
        <h1>{ i18n.t( KEYS.HEADERS.COOKING_HEADER ) }</h1>
        <CookingContainer id={Number( match.params.id )} user={user} />
    </div>
);

CookingView.propTypes = {
    match: PropTypes.shape( {
        params: PropTypes.shape( {
            id: PropTypes.string,
        } ).isRequired,
    } ).isRequired,
    user: PropTypes.shape( {
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    } ).isRequired,
};

export default CookingView;