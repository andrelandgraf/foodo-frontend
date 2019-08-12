import React, { useMemo, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import useUserHasAccessLevels from '../../hooks/useUserHasAccessLevels';

import { isValidRedirectUrl, setRedirectUrl } from '../../utilities/redirect';

import { AUTH_ROUTES } from '../App/App';

export const ACCESS_RIGHTS = {
    COOKING: 'cooking',
};

/**
 * Paywall component abstracts away the restiriction to access
 * @param wants the ressource the user wants to access
 * @param children the content that should be walled off
 */
function Paywall( { wants, children: route } ) {
    const userHasAccesLevels = useUserHasAccessLevels();

    const canCook = userHasAccesLevels.hasSubscribed
        || userHasAccesLevels.makesBabysteps
        || userHasAccesLevels.isAdmin;

    const hasRights = useMemo( () => {
        switch ( wants ) {
        case ACCESS_RIGHTS.COOKING:
            return canCook;
        default: return false;
        }
    }, [ wants, userHasAccesLevels ] );

    useEffect( () => {
        const redirect = window.location.pathname === AUTH_ROUTES.SUBSCRIBE
        || !isValidRedirectUrl( window.location.pathname )
            ? AUTH_ROUTES.HOME
            : window.location.pathname;
        setRedirectUrl( redirect );
    }, [] );

    return (
        <>
            { hasRights
                ? route
                : ( <Redirect to={AUTH_ROUTES.SUBSCRIBE} /> )
            }
        </>
    );
}

Paywall.propTypes = {
    wants: PropTypes.oneOf( Object.values( ACCESS_RIGHTS ) ).isRequired,
    children: PropTypes.node.isRequired,
};

export default Paywall;
