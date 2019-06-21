import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../utilities/internationalization/internationalization';

import PasswordContainer from '../container/Password/PasswordContainer';


// eslint-disable-next-line no-unused-vars
const PasswordView = () => (
    <div className="container password-container">
        <h1>{ i18n.t( KEYS.HEADERS.CHANGE_PW )}</h1>
        <PasswordContainer />
    </div>
);

export default PasswordView;
