import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../../utilities/internationalization/internationalization';
import { logUserOut } from '../../../services/foodo-api/user/userService';

import logoutIcon from '../../../../img/logout.svg';

import CustomButton from '../../button/customButton';

/**
 * Logout navigation menu item
 * @param setUser function
 * @param loggedIn if a user is currently logged in
 * @param onWillLogout function for further side effects
 */
const Logout = ( { setUser, loggedIn, onWillLogout } ) => (
    <CustomButton
        classes={loggedIn ? undefined : 'not-displayed'}
        id="logout-button"
        role="button"
        onClick={() => {
            if ( onWillLogout ) { onWillLogout(); }
            // delete tokens in local storage
            logUserOut();
            // ovveride user object and trigger rerender of App
            setUser( undefined );
        }}
    >
        {i18n.t( KEYS.LABELS.LOGOUT )}
        <img
            src={logoutIcon}
            alt="Logout Icon"
        />
    </CustomButton>
);

Logout.propTypes = {
    setUser: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    onWillLogout: PropTypes.func,
};

Logout.defaultProps = {
    onWillLogout: undefined,
};

export default Logout;
