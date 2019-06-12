import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';
import { AUTH_ROUTES, NONAUTH_ROUTES } from '../App/App';

import NavBar from '../../components/navbar/navbar';
import NavBarItem from '../../components/navbar/elements/navbarItem';
import PreferenceItem from '../../components/navbar/elements/preferenceItem';
import PreferencesMenuContainer from '../PreferenceMenu/PreferenceMenuContainer';

class NavBarContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            prefMenuOpen: false,
            prefWillRerender: false,
        };

        window.addEventListener( 'click', this.onClickCloseMenu, false );
    }

    componentWillUnmount() {
        window.removeEventListener( 'click', this.onClickCloseMenu );
    }

    registerRerender = () => this.setState( { prefWillRerender: true } )

    onClickPreferenceItem = () => {
        this.setState( ( { prefMenuOpen } ) => ( { prefMenuOpen: !prefMenuOpen } ) );
    }

    closePreferenceMenu = () => {
        this.setState( { prefMenuOpen: false } );
    }

    onClickCloseMenu = ( event ) => {
        const menu = document.getElementsByClassName( 'preferences-menu' );
        const button = document.getElementById( 'preferences-navbar-button' );
        if ( !menu || !menu.length ) return;
        // if rerender, items inside might change, allow one click without further checking
        const { prefWillRerender } = this.state;
        if ( prefWillRerender ) {
            this.setState( { prefWillRerender: false } );
            return;
        }
        // do not do anything if prefButton is clicked, as we have a dedicated func for that
        const targetIsPrefButton = event.target.id === 'preferences-navbar-button';
        const targetInPrefButton = button && button.contains( event.target );
        if ( targetIsPrefButton || targetInPrefButton ) return;
        // do not close menu if user clicked inside
        const targetInMenu = menu[ 0 ].contains( event.target );
        const targetIsMenu = event.target === menu[ 0 ];
        const { prefMenuOpen } = this.state;
        if ( prefMenuOpen && ( !targetInMenu && !targetIsMenu ) ) {
            this.setState( { prefMenuOpen: false } );
        }
    }

    renderAuthenticatedNavBarItems = () => [
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
        <PreferenceItem
            key="preferences"
            label={i18n.t( KEYS.LABELS.PREFERENCES )}
            float="right"
            onClick={this.onClickPreferenceItem}
        />,
    ];

    renderNotAuthenticatedNavBarItems = () => [
        <PreferenceItem
            key="preferences"
            label={i18n.t( KEYS.LABELS.PREFERENCES )}
            float="right"
            onClick={this.onClickPreferenceItem}
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

    render() {
        const { loggedIn } = this.props;
        const { prefMenuOpen } = this.state;
        return (
            <React.Fragment>
                <NavBar>
                    { loggedIn
                        ? this.renderAuthenticatedNavBarItems()
                        : this.renderNotAuthenticatedNavBarItems()
                    }
                </NavBar>
                { prefMenuOpen
                    ? (
                        <PreferencesMenuContainer
                            registerRerender={this.registerRerender}
                            closeMenu={this.closePreferenceMenu}
                        />
                    )
                    : undefined
                }
            </React.Fragment>
        );
    }
}

NavBarContainer.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default NavBarContainer;
