import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import {
    getLocale, setLocale, LOCALES, KEYS,
} from '../../../utilities/internationalization/internationalization';

import { postLocale } from '../../../services/foodo-api/user/preferencesService';
import { isLoggedIn } from '../../../services/foodo-api/user/userService';
import { AUTH_ROUTES } from '../../App/App';

import { UserStateContext } from '../../../provider/UserStateProvider';

import CustomButton from '../../../components/button/customButton';
import Title from '../../../components/preferences/title';
import LogoutContainer from '../../Logout/LogoutContainer';
import Logout from '../../../components/preferences/logout';
import PreferenceItem from '../../../components/preferences/preferenceItem';
import PreferenceLink from '../../../components/preferences/preferenceLink';

import globe from '../../../../img/globe.svg';
import key from '../../../../img/key.svg';
import book from '../../../../img/book.svg';
import statistic from '../../../../img/statistic.svg';
import preferences from '../../../../img/preferences.svg';

const MAIN_MENU = i18n.t( KEYS.LABELS.NAVIGATION );
const PREF_MENU = i18n.t( KEYS.LABELS.PREFERENCES );
const LANG_MENU = i18n.t( KEYS.LABELS.LANGUAGES );


function NavMenuContainer( { closeMenu } ) {
    const [ title, setTitle ] = useState( MAIN_MENU );
    const { user } = useContext( UserStateContext );

    const onSelectLocale = async ( locale ) => {
        if ( isLoggedIn() ) {
            await postLocale( locale );
        }
        // save locale to user, as we reload the page afterwards,
        // we do not need to set updated user object here
        await setLocale( locale );

        // completly reload and rerender all components to change language strings
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    const renderLocaleItems = () => Object.keys( LOCALES ).map( LOCALE => (
        <li key={LOCALE} className="item">
            <CustomButton
                classes={getLocale() === LOCALES[ LOCALE ] ? 'current' : undefined}
                id={`${ LOCALE }-selection-button`}
                onClick={() => onSelectLocale( LOCALES[ LOCALE ] )}
            >
                { LOCALES[ LOCALE ] }
            </CustomButton>
        </li>
    ) );

    const renderMainMenu = () => (
        <>
            <li className="title">
                { title }
            </li>
            <li className="item">
                <PreferenceLink
                    to={AUTH_ROUTES.STATISTICS}
                    onClick={closeMenu}
                    label={i18n.t( KEYS.LABELS.STATISTICS )}
                    icon={statistic}
                    alt="Go to your statistics page"
                    visible={isLoggedIn()}
                />
            </li>
            <li className="item">
                <PreferenceItem
                    id="language-menu"
                    onClick={() => setTitle( LANG_MENU )}
                    label={i18n.t( KEYS.LABELS.LANGUAGE )}
                    icon={globe}
                    alt="Go to language menu"
                    visible={!isLoggedIn()}
                />
            </li>
            <li className="item">
                <PreferenceItem
                    id="preference-menu"
                    onClick={() => setTitle( PREF_MENU )}
                    label={i18n.t( KEYS.LABELS.PREFERENCES )}
                    icon={preferences}
                    alt="Go to preferences menu"
                    visible={isLoggedIn()}
                />
            </li>
            <li className="item">
                <PreferenceLink
                    to={AUTH_ROUTES.ABOUT}
                    onClick={closeMenu}
                    label={i18n.t( KEYS.LABELS.ABOUT )}
                    icon={book}
                    alt="Go to the about page"
                />
            </li>
            <li className="item">
                <LogoutContainer onWillLogout={closeMenu} LogoutComponent={Logout} />
            </li>
        </>
    );

    const renderLanguageMenu = () => (
        <>
            <li className="title">
                <Title
                    id={`${ title }-button`}
                    title={title}
                    onClick={() => ( isLoggedIn() ? setTitle( PREF_MENU ) : setTitle( MAIN_MENU ) )}
                />
            </li>
            { renderLocaleItems() }
        </>
    );

    const renderPreferencesMenu = () => (
        <>
            <li className="title">
                <Title
                    id={`${ title }-button`}
                    title={user.username}
                    onClick={() => setTitle( MAIN_MENU )}
                />
            </li>
            <li className="item">
                <PreferenceItem
                    id="language-menu"
                    onClick={() => setTitle( LANG_MENU )}
                    label={i18n.t( KEYS.LABELS.LANGUAGE )}
                    icon={globe}
                    alt="Go to language menu"
                />
            </li>
            <li className="item">
                <PreferenceLink
                    to={AUTH_ROUTES.PASSWORD}
                    onClick={closeMenu}
                    label={i18n.t( KEYS.LABELS.PASSWORD )}
                    icon={key}
                    alt="Go to change password page"
                    visible={isLoggedIn()}
                />
            </li>
        </>
    );

    const renderMenu = () => {
        switch ( title ) {
        case MAIN_MENU:
            return renderMainMenu();
        case PREF_MENU:
            return renderPreferencesMenu();
        case LANG_MENU:
            return renderLanguageMenu();
        default:
            return undefined;
        }
    };

    return (
        <div
            onClick={event => event.stopPropagation()}
            role="presentation"
        >
            <nav>
                <ul className="navmenu">
                    { renderMenu() }
                </ul>
            </nav>

        </div>

    );
}

NavMenuContainer.propTypes = {
    closeMenu: PropTypes.func.isRequired,
};


export default NavMenuContainer;
