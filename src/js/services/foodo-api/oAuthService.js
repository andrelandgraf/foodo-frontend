import axios from 'axios';
import qs from 'qs';

import Logger from '../../utilities/Logger';
import { isUnauthorizedError, isNetworkError } from '../utilities/httpProtocol';
import {
    throwWrongCredentialsError, throwNotAuthorizedError,
    throwServerNotReachableError, isCustomError, throwRequestTokenExpiredError,
} from '../../utilities/errorHandler/errorHandler';
import { API, ENDPOINTS } from './api';

const LoggingUtility = new Logger( 'userService.js' );

export const GRANT_TYPES = {
    AUTH_CODE: 'authorization_code',
    REFRESH_TOKEN: 'refresh_token',
    PASSWORD: 'password',
};

/* Handle storage of user tokens */

export const getStoredRefreshToken = () => window.localStorage.refreshToken;
export const getStoredAuthToken = () => window.localStorage.authToken;

const setStoredRefreshToken = ( refreshToken ) => {
    window.localStorage.refreshToken = refreshToken;
};

const setStoredAuthToken = ( authToken ) => {
    window.localStorage.authToken = authToken;
};

export const unsetStoredTokens = () => {
    window.localStorage.removeItem( 'authToken' );
    window.localStorage.removeItem( 'refreshToken' );
};

export const isAuthenticated = () => !!getStoredAuthToken();

/**
 * getTokenHeaders returns the required headers for the authentication request
 * @param {string} clientID
 * @param {string} clientSecret
 */
export const getTokenHeaders = ( clientID, clientSecret ) => {
    if ( !clientID || !clientSecret ) {
        throw Error( 'oauth credientiels undefined' );
    }
    const credentials = Buffer.from( `${ clientID }:${ clientSecret }` ).toString( 'base64' );
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${ credentials }`,
    };
};

/**
 * getCodeHeaders returns the required headers for the authorization request
 */
const getCodeHeaders = () => ( {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${ getStoredAuthToken() }`,
} );

/**
 * postAuthRequest requests the access token (e.g. through refresh token or user authentication)
 * @param {*} data
 * @param {*} headers
 */
const postAuthRequest = ( data, headers ) => axios
    .post( API + ENDPOINTS.AUTHENTICATE, data, { headers } )
    .catch( ( err ) => {
        LoggingUtility.error( `Error in post request to entpoint ${ ENDPOINTS.AUTHENTICATE }`, err );
        if ( isNetworkError( err ) ) {
            throwServerNotReachableError();
        }
        throw Error( `${ err.response.data.code }:${ err.response.message }` );
    } );

/**
 * authenticate handles the login of a user via token retrieval
 * @param {*} data
 * @param {*} header
 * @returns {Object} user object
 */
export const authenticate = ( clientId, clientSecret, data ) => (
    postAuthRequest( qs.stringify( data ), getTokenHeaders( clientId, clientSecret ) )
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

/**
 *  refreshAuthToken gets called to retrieve a new access token via the refresh token
 * @param {Function} resolve
 */
export const refreshAuthToken = ( resolve ) => {
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_KEY_ID;
    const clientSecret = process.env.REACT_APP_OAUTH_CLIENT_SECRET_KEY;
    const refreshToken = getStoredRefreshToken();
    const data = {
        grant_type: GRANT_TYPES.REFRESH_TOKEN,
        refresh_token: refreshToken,
    };
    return authenticate( clientId, clientSecret, data )
        .then( () => resolve() )
        .catch( ( err ) => {
            const { status } = err.response;
            if ( isUnauthorizedError( status ) ) {
                throwNotAuthorizedError();
            }
            throw Error( `${ err.response.data.code }:${ err.response.message }` );
        } );
};

/* Authorize third party clients to act for the user */

export const getAuthorizeCode = ( clientId, state, redirectUri ) => {
    const params = `?client_id=${ clientId }&response_type=code&state=${ state }&redirect_uri=${ redirectUri }`;
    return fetch( `${ API }${ ENDPOINTS.AUTHORIZE }${ params }`, { headers: getCodeHeaders() } );
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
    return authenticate( clientId, clientSecret, data )
        .then( () => getAuthorizeCode( clientId, state, redirectUri ) )
        .then( response => response.json() )
        .then( code => code.authorizationCode )
        .catch( ( err ) => {
            if ( isCustomError( err ) ) {
                throw err;
            }
            LoggingUtility.error( 'Error while authorizing client', err );
            throwRequestTokenExpiredError();
        } );
};
