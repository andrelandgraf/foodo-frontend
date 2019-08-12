import React from 'react';
import PropTypes from 'prop-types';

import CookingContainer from '../../container/Cooking/CookingContainer';
import { UserRecipeProvider } from '../../provider/UserRecipeProvider';

const CookingView = ( { match } ) => (
    <div className="container cooking-page">
        <UserRecipeProvider>
            <CookingContainer id={match.params.id} />
        </UserRecipeProvider>
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
