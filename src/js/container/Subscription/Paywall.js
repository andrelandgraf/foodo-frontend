import React, { useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import useUserHasAccessLevels from '../../hooks/useUserHasAccessLevels';

import { isValidRedirectUrl } from '../../utilities/redirect';

import { AUTH_ROUTES } from '../App/App';
import SubscribeView from '../../views/subscribeView';

export const ACCESS_RIGHTS = {
    COOKING: 'cooking',
};

function Paywall( { wants, children: route } ) {
    const userHasAccesLevels = useUserHasAccessLevels();
    const { path } = route.props;

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

    const forwardingUrl = useMemo( () => ( window.location.pathname === AUTH_ROUTES.SUBSCRIBE
        || !isValidRedirectUrl( window.location.pathname )
        ? AUTH_ROUTES.HOME
        : window.location.pathname ),
    [] );

    const wantedRoute = (
        <>
            <Redirect exact strict from={AUTH_ROUTES.SUBSCRIBE} to={forwardingUrl} />
            {route}
        </>
    );

    const subscribeRoute = (
        <>
            <Redirect exact from={path} to={AUTH_ROUTES.SUBSCRIBE} />
            <Route exact from={AUTH_ROUTES.SUBSCRIBE} component={SubscribeView} />
        </>
    );

    return (
        <>
            { hasRights
                ? wantedRoute
                : subscribeRoute
            }
        </>
    );
}

Paywall.propTypes = {
    wants: PropTypes.oneOf( Object.values( ACCESS_RIGHTS ) ).isRequired,
    children: PropTypes.node.isRequired,
};

export default Paywall;
