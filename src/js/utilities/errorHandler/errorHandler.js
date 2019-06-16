import i18n from 'i18next';

import { KEYS } from '../internationalization/internationalization';
import {
    ServerNotReachableError,
    NotAuthorizedError,
    WrongCredentialsError,
    UsernameAlreadyTakenError,
    RequestParameterMissingError,
} from './Error';

/*
 * Error Messages should be consistent accorss an application
 */
export const throwServerNotReachableError = () => {
    const msg = i18n.t( KEYS.MESSAGES.SERVER_NOT_REACHABLE_ERR );
    throw new ServerNotReachableError( msg );
};

export const throwNotAuthorizedError = () => {
    const msg = i18n.t( KEYS.MESSAGES.NOT_AUTHORIZED_ERR );
    throw new NotAuthorizedError( msg );
};

export const throwWrongCredentialsError = () => {
    const msg = i18n.t( KEYS.MESSAGES.WRONG_CREDENTIALS_ERR );
    throw new WrongCredentialsError( msg );
};

export const throwUsernameAlreadyTaken = () => {
    const msg = i18n.t( KEYS.MESSAGES.USERNAME_ALREADY_TAKEN_ERR );
    throw new UsernameAlreadyTakenError( msg );
};

export const throwRequestParameterMissingError = () => {
    const msg = i18n.t( KEYS.MESSAGES.REQUEST_PARAMS_MISSING_ERR );
    throw new RequestParameterMissingError( msg );
};

export const isCustomError = err => err.isCustomError;
