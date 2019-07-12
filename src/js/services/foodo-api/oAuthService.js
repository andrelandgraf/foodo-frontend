import axios from 'axios';

import Logger from '../../utilities/Logger';
import { isUnauthorizedError, isNetworkError } from '../utilities/httpProtocol';
import { throwNotAuthorizedError, throwServerNotReachableError } from '../../utilities/errorHandler/errorHandler';
import { API, ENDPOINTS } from './api';
import { getStoredRefreshToken, getStoredAuthToken, authenticate } from './user/userService';

const LoggingUtility = new Logger( 'userService.js' );

export const GRANT_TYPES = {
    AUTH_CODE: 'authorization_code',
    REFRESH_TOKEN: 'refresh_token',
    PASSWORD: 'password',
};

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
export const getCodeHeaders = () => ( {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${ getStoredAuthToken() }`,
} );

/**
 * postAuthRequest requests the access token (e.g. through refresh token or user authentication)
 * @param {*} data
 * @param {*} headers
 */
export const postAuthRequest = ( data, headers ) => axios
    .post( API + ENDPOINTS.AUTHENTICATE, data, { headers } )
    .catch( ( err ) => {
        LoggingUtility.error( `Error in post request to entpoint ${ ENDPOINTS.AUTHENTICATE }`, err );
        if ( isNetworkError( err ) ) {
            throwServerNotReachableError();
        }
        throw Error( `${ err.response.data.code }:${ err.response.message }` );
    } );

export const getAuthorizeCode = ( clientId, state, redirectUri ) => {
    const params = `?client_id=${ clientId }&response_type=code&state=${ state }&redirect_uri=${ redirectUri }`;
    return fetch( `${ API }${ ENDPOINTS.AUTHORIZE }${ params }`, { headers: getCodeHeaders() } );
};

/**
 *  refreshAuthToken gets called to retrieve a new access token via the refresh token
 * @param {Function} resolve
 */
export const refreshAuthToken = ( resolve ) => {
    console.log( 'lets get a refresh token' );
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_KEY_ID;
    const clientSecret = process.env.REACT_APP_OAUTH_CLIENT_SECRET_KEY;
    const headers = getTokenHeaders( clientId, clientSecret );
    const refreshToken = getStoredRefreshToken();
    const data = {
        grant_type: GRANT_TYPES.REFRESH_TOKEN,
        refresh_token: refreshToken,
    };
    return authenticate( data, headers )
        .then( () => resolve() )
        .catch( ( err ) => {
            const { status } = err.response;
            if ( isUnauthorizedError( status ) ) {
                console.log( 'refresh throws a not authed error' );
                throwNotAuthorizedError();
            }
            throw Error( `${ err.response.data.code }:${ err.response.message }` );
        } );
};
