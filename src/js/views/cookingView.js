import React from 'react';
import PropTypes from 'prop-types';

import CookingContainer from '../container/Cooking/CookingContainer';

// eslint-disable-next-line no-unused-vars
const CookingView = ( { match } ) => (
    <div className="container cooking-page">
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
