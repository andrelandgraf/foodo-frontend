import React, {
    useState, useEffect, useCallback, useContext,
} from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';
import { AUTH_ROUTES, NONAUTH_ROUTES } from '../App/App';

import NavBar from '../../components/navbar/navbar';
import NavBarItem from '../../components/navbar/elements/navbarItem';
import PreferenceItem from '../../components/navbar/elements/preferenceItem';
import PreferencesMenuContainer from '../PreferenceMenu/PreferenceMenuContainer';
import { LayoutContext } from '../../provider/LayoutProvider';

function NavBarContainer( { loggedIn } ) {
    const [ prefMenuOpen, setPrefMenuOpen ] = useState( false );
    const { showNavBar } = useContext( LayoutContext );

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
        <PreferenceItem
            key="preferences"
            label={i18n.t( KEYS.LABELS.PREFERENCES )}
            float="right"
            onClick={onClickPrefIcon}
        />,
    ];

    const renderNotAuthenticatedNavBarItems = () => [
        <PreferenceItem
            key="preferences"
            label={i18n.t( KEYS.LABELS.PREFERENCES )}
            float="right"
            onClick={onClickPrefIcon}
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
