import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import {
    getLocale, setLocale, LOCALES, KEYS,
} from '../../utilities/internationalization/internationalization';


import CustomButton from '../../components/button/customButton';
import Title from '../../components/preferences/title';
import Language from '../../components/preferences/language';
import LogoutContainer from '../Logout/LogoutContainer';
import Logout from '../../components/preferences/logout';

const MAIN_MENU = i18n.t( KEYS.LABELS.PREFERENCES );
const LANG_MENU = i18n.t( KEYS.LABELS.LANGUAGES );

class PreferencesMenuContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            title: MAIN_MENU,
        };
    }

    setTitle = ( title ) => {
        const { registerRerender } = this.props;
        registerRerender();
        this.setState( { title } );
    }

    onSelectLocale = async ( locale ) => {
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
        const { title } = this.state;
        return (
            <ul className="preferences-menu">
                { this.renderMenu( title, closeMenu ) }
            </ul>
        );
    }
}

PreferencesMenuContainer.propTypes = {
    closeMenu: PropTypes.func.isRequired,
    registerRerender: PropTypes.func.isRequired,
};

export default PreferencesMenuContainer;
