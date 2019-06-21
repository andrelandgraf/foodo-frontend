import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import key from '../../../img/key.svg';

import CustomButton from '../button/customButton';


const Password = ( { loggedIn, onClickPassword } ) => (
    <CustomButton
        classes={loggedIn ? undefined : 'not-displayed'}
        id="change-pw-button"
        role="button"
        onClick={onClickPassword}
    >
        {i18n.t( KEYS.LABELS.PASSWORD )}
        <img
            src={key}
            alt="Change Password Icon"
        />
    </CustomButton>
);

Password.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onClickPassword: PropTypes.func.isRequired,
};

export default Password;
