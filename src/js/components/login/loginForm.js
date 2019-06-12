import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import SubmitButton from '../button/submitButton';

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
        <SubmitButton label={actionName} isLoading={isLoading} />
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
