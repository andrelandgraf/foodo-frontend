import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import CookingContainer from '../container/Cooking/CookingContainer';

// eslint-disable-next-line no-unused-vars
const CookingView = ( { match } ) => (
    <div className="container cooking-page">
        <h1>{ i18n.t( KEYS.HEADERS.COOKING_HEADER ) }</h1>
        <CookingContainer id={match.params.id} />
    </div>
);

CookingView.propTypes = {
    match: PropTypes.shape( {
        params: PropTypes.shape( {
            id: PropTypes.string,
        } ).isRequired,
    } ).isRequired,
};

export default CookingView;
