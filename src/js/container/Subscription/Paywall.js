/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useMemo, useLayoutEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import useSubscriptionLevels from '../../hooks/useSubscriptionLevels';
import { AUTH_ROUTES } from '../App/App';
import SubscribeView from '../../views/subscribeView';
import { setRedirectUrl, getRedirectUrl } from '../../utilities/redirect';

export const ACCESS_RIGHTS = {
    COOKING: 'cooking',
};

function Paywall( { wants, children: route } ) {
    const subscriptionLevels = useSubscriptionLevels();
    const { path } = route.props;

    const hasRights = useMemo( () => {
        switch ( wants ) {
        case ACCESS_RIGHTS.COOKING:
            return subscriptionLevels.hasBasicSubscription || subscriptionLevels.makesBabysteps;
        default: return false;
        }
    }, [ wants, subscriptionLevels ] );

    const forwardingUrl = useMemo( () => ( window.location.pathname === AUTH_ROUTES.SUBSCRIBE
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
