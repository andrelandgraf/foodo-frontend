import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import SubmitButton from '../button/submitButton';

/**
 * the login/register form
 * @param username current username value of the form
 * @param password current password value of the form
 * @param onUsernameChange function
 * @param onPasswordChange function
 * @param onSubmit function
 * @param actionName the label of the form (e.g. login or register)
 * @param isLoading if this form is submitted and should display loading
 */
const LoginForm = ( {
    username, password, onUsernameChange, onPasswordChange, onSubmit, actionName, isLoading,
} ) => (
    <form className="login-form" onSubmit={onSubmit}>
        <input
            type="text"
            placeholder={i18n.t( KEYS.LABELS.USERNAME )}
            value={username}
            onChange={onUsernameChange}
            pattern=".{3,}"
            title={i18n.t( KEYS.MESSAGES.USERNAME_WARNING )}
            required
        />
        <input
            type="password"
            placeholder={i18n.t( KEYS.LABELS.PASSWORD )}
            value={password}
            onChange={onPasswordChange}
            pattern=".{1,}"
            title={i18n.t( KEYS.MESSAGES.PASSWORD_WARNING )}
            required
        />
        <SubmitButton label={actionName} isLoading={isLoading} classes="button-center" />
    </form>
);

LoginForm.propTypes = {
    actionName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
