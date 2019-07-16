import React, {
    useState, useEffect, useCallback, useContext,
} from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';
import { AUTH_ROUTES, NONAUTH_ROUTES } from '../App/App';

import NavBar from '../../components/navbar/navbar';
import NavBarItem from '../../components/navbar/elements/navbarItem';
import PreferencesButton from '../../components/navbar/elements/preferencesButton';
import PreferencesMenuContainer from '../PreferenceMenu/PreferenceMenuContainer';
import { LayoutContext } from '../../provider/LayoutProvider';
import useUserHasAccessLevels from '../../hooks/useUserHasAccessLevels';

import userDefault from '../../../img/user-logo.svg';
import userFree from '../../../img/user-free.svg';
import userPremium from '../../../img/user-premium.svg';
import { isLoggedIn } from '../../services/foodo-api/user/userService';


function NavBarContainer( { loggedIn } ) {
    const [ prefMenuOpen, setPrefMenuOpen ] = useState( false );
    const { showNavBar } = useContext( LayoutContext );
    const { hasSubscribed } = useUserHasAccessLevels();

    useEffect( () => {
        const onClickCloseMenu = ( event ) => {
            // do not do anything if prefButton is clicked, as we have a dedicated func for that
            const button = document.getElementById( 'preferences-navbar-button' );
            const targetIsPrefButton = event.target.id === 'preferences-navbar-button';
            const targetInPrefButton = button && button.contains( event.target );
            if ( targetIsPrefButton || targetInPrefButton ) return;
            setPrefMenuOpen( false );
        };

        window.addEventListener( 'click', onClickCloseMenu, false );
        return () => window.removeEventListener( 'click', onClickCloseMenu );
    }, [] );

    const onClickPrefIcon = useCallback( () => setPrefMenuOpen( !prefMenuOpen ), [ prefMenuOpen ] );
    const getPrefIcon = () => {
        if ( isLoggedIn() ) {
            return hasSubscribed ? userPremium : userFree;
        }
        return userDefault;
    };

    const renderAuthenticatedNavBarItems = () => [
        <NavBarItem
            key="home"
            label={i18n.t( KEYS.LABELS.HOME )}
            link={AUTH_ROUTES.HOME}
            float="left"
        />,
        <NavBarItem
            key="profile"
            label={i18n.t( KEYS.LABELS.MY_PROFILE )}
            link={AUTH_ROUTES.PROFILE}
            float="left"
        />,
        <NavBarItem
            key="statistics"
            label={i18n.t( KEYS.LABELS.STATISTICS )}
            link={AUTH_ROUTES.STATISTICS}
            float="left"
            hideOnMobile
        />,
        <PreferencesButton
            key="preferences"
            label={i18n.t( KEYS.LABELS.PREFERENCES )}
            float="right"
            onClick={onClickPrefIcon}
            prefIcon={getPrefIcon()}
        />,
    ];

    const renderNotAuthenticatedNavBarItems = () => [
        <PreferencesButton
            key="preferences"
            label={i18n.t( KEYS.LABELS.PREFERENCES )}
            float="right"
            onClick={onClickPrefIcon}
            prefIcon={getPrefIcon()}
        />,
        <NavBarItem
            key="register"
            label={i18n.t( KEYS.LABELS.REGISTER )}
            link={NONAUTH_ROUTES.REGISTER}
            float="right"
        />,
        <NavBarItem
            key="login"
            label={i18n.t( KEYS.LABELS.LOGIN )}
            link={NONAUTH_ROUTES.LOGIN}
            float="right"
        />,
    ];

    const renderNavBar = () => (
        <>
            <NavBar>
                { loggedIn
                    ? renderAuthenticatedNavBarItems()
                    : renderNotAuthenticatedNavBarItems()
                }
            </NavBar>
            { prefMenuOpen
                ? (
                    <PreferencesMenuContainer
                        closeMenu={onClickPrefIcon}
                    />
                )
                : undefined
            }
        </>
    );

    return showNavBar ? renderNavBar() : null;
}

NavBarContainer.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default NavBarContainer;
