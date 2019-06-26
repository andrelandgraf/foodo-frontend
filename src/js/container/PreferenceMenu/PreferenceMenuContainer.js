import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import {
    getLocale, setLocale, LOCALES, KEYS,
} from '../../utilities/internationalization/internationalization';

import { postLocale } from '../../services/foodo-api/user/preferencesService';
import { isAuthenticated } from '../../services/foodo-api/user/userService';

import CustomButton from '../../components/button/customButton';
import Title from '../../components/preferences/title';
import Language from '../../components/preferences/language';
import LogoutContainer from '../Logout/LogoutContainer';
import Logout from '../../components/preferences/logout';
import About from '../../components/preferences/about';
import Password from '../../components/preferences/password';
import { AUTH_ROUTES } from '../App/App';


const MAIN_MENU = i18n.t( KEYS.LABELS.PREFERENCES );
const LANG_MENU = i18n.t( KEYS.LABELS.LANGUAGES );

class PreferencesMenuContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            title: MAIN_MENU,
            clickedPW: false,
            clickedAbout: false,
        };
    }

    setTitle = ( title ) => {
        this.setState( { title } );
    }

    onClickPassword = () => this.setState( { clickedPW: true } );

    onClickAbout = () => this.setState( { clickedAbout: true } )

    onSelectLocale = async ( locale ) => {
        if ( isAuthenticated() ) {
            await postLocale( locale );
        }
        // save locale to user, as we reload the page afterwards,
        // we do not need to set updated user object here
        await setLocale( locale );

        // completly reload and rerender all components to change language strings
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    renderLocaleItems = () => Object.keys( LOCALES ).map( LOCALE => (
        <li key={LOCALE} className="item">
            <CustomButton
                classes={getLocale() === LOCALES[ LOCALE ] ? 'current' : undefined}
                id={`${ LOCALE }-selection-button`}
                onClick={() => this.onSelectLocale( LOCALES[ LOCALE ] )}
            >
                { LOCALES[ LOCALE ] }
            </CustomButton>
        </li>
    ) )

    renderMainMenu = ( title, closeMenu ) => (
        <React.Fragment>
            <li className="title">
                { title }
            </li>
            <li className="item">
                <Language
                    onClick={() => this.setTitle( LANG_MENU )}
                />
            </li>
            <li className="item">
                <Password onClickPassword={this.onClickPassword} loggedIn={isAuthenticated()} />
            </li>
            <li className="item">
                <About onClickAbout={this.onClickAbout} />
            </li>
            <li className="item">
                <LogoutContainer onWillLogout={closeMenu} LogoutComponent={Logout} />
            </li>
        </React.Fragment>
    )

    renderLanguageMenu = title => (
        <React.Fragment>
            <li className="title">
                <Title
                    id={`${ title }-button`}
                    title={title}
                    onClick={() => this.setTitle( MAIN_MENU )}
                />
            </li>
            { this.renderLocaleItems() }
        </React.Fragment>
    )

    renderMenu = ( title, closeMenu ) => {
        switch ( title ) {
        case MAIN_MENU:
            return this.renderMainMenu( title, closeMenu );
        case LANG_MENU:
            return this.renderLanguageMenu( title );
        default:
            return undefined;
        }
    }

    render() {
        const { closeMenu } = this.props;
        const { title, clickedPW, clickedAbout } = this.state;

        if ( clickedPW ) {
            return (
                <Redirect push to={AUTH_ROUTES.PASSWORD} />
            );
        }

        if ( clickedAbout ) {
            return (
                <Redirect push to={AUTH_ROUTES.ABOUT} />
            );
        }

        return (
            <div
                onClick={event => event.stopPropagation()}
                role="presentation"
            >
                <ul className="preferences-menu">
                    { this.renderMenu( title, closeMenu ) }
                </ul>
            </div>

        );
    }
}

PreferencesMenuContainer.propTypes = {
    closeMenu: PropTypes.func.isRequired,
};

export default PreferencesMenuContainer;
