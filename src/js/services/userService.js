import qs from 'qs';

import Logger from '../utilities/Logger';
import { throwWrongCredentialsError, throwUsernameAlreadyTaken, isCustomError } from '../utilities/errorHandler/errorHandler';
import {
    GRANT_TYPES, getTokenHeaders, postAuthRequest, getAuthorizeCode,
} from './oAuthService';
import { postRequest, getRequest } from './httpService';

const LoggingUtility = new Logger( 'userService.js' );

const REGISTER_ENDPOINT = 'auth/register';
const USER_ENDPOINT = 'auth/me';

const setStoredRefreshToken = ( refreshToken ) => {
    window.localStorage.refreshToken = refreshToken;
};

const setStoredAuthToken = ( authToken ) => {
    window.localStorage.authToken = authToken;
};

export const getStoredRefreshToken = () => window.localStorage.refreshToken;
export const getStoredAuthToken = () => window.localStorage.authToken;

/**
 * authenticate handles the login of a user via token retrieval
 * @param {*} data
 * @param {*} header
 * @returns {Object} user object
 */
const authenticate = ( data, header ) => (
    postAuthRequest( qs.stringify( data ), header )
        .then( ( res ) => {
            setStoredAuthToken( res.data.accessToken );
            setStoredRefreshToken( res.data.refreshToken );
            return res.data.user;
        } )
        .catch( ( err ) => {
            if ( isCustomError( err ) ) {
                throw err;
            }
            throwWrongCredentialsError();
        } )
);

export const logUserIn = ( username, password ) => {
    const data = {
        grant_type: GRANT_TYPES.PASSWORD,
        username,
        password,
    };
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_KEY_ID;
    const clientSecret = process.env.REACT_APP_OAUTH_CLIENT_SECRET_KEY;
    const header = getTokenHeaders( clientId, clientSecret );
    return authenticate( data, header );
};

export const registerUser = ( username, password ) => {
    const data = {
        username,
        password,
    };
    return postRequest( REGISTER_ENDPOINT, data )
        // will return user object to initial caller of registerUser
        .then( () => logUserIn( username, password ) )
        .catch( ( err ) => {
            if ( isCustomError( err ) ) {
                throw err;
            }
            LoggingUtility.error( 'Error while registering new user', err );
            throwUsernameAlreadyTaken();
        } );
};

export const authorizeClient = ( username, password, clientId, state, redirectUri ) => {
    if ( process.env.REACT_APP_OAUTH_ALEXA_CLIENT_KEY_ID !== clientId ) {
        throw Error( 'unsupported client id!' );
    }
    const data = {
        grant_type: GRANT_TYPES.PASSWORD,
        username,
        password,
    };
    const clientSecret = process.env.REACT_APP_OAUTH_ALEXA_CLIENT_SECRET_KEY;
    const header = getTokenHeaders( clientId, clientSecret );
    return authenticate( data, header )
        .then( () => getAuthorizeCode( clientId, state, redirectUri ) )
        .then( response => response.json() )
        .then( code => code.authorizationCode )
        .catch( ( err ) => {
            if ( isCustomError( err ) ) {
                throw err;
            }
            LoggingUtility.error( 'Error while authorizing client', err );
        } );
};

export const getUser = () => getRequest( USER_ENDPOINT );

export const logUserOut = () => {
    window.localStorage.removeItem( 'authToken' );
    window.localStorage.removeItem( 'refreshToken' );
};

export const isAuthenticated = () => !!getStoredAuthToken();
