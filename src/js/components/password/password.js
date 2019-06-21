import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import SubmitButton from '../button/submitButton';

const Password = ( {
    password, onPasswordChange, onSubmit, isLoading,
} ) => (
    <form className="pw-form" onSubmit={onSubmit}>
        <input
            type="password"
            placeholder={i18n.t( KEYS.LABELS.PASSWORD )}
            value={password}
            onChange={onPasswordChange}
            pattern=".{1,}"
            title={i18n.t( KEYS.MESSAGES.PASSWORD_WARNING )}
            required
        />
        <SubmitButton label={i18n.t( KEYS.LABELS.CHANGE )} isLoading={isLoading} />
    </form>
);

Password.propTypes = {
    password: PropTypes.string.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default Password;
