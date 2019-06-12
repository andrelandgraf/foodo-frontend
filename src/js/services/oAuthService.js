import axios from 'axios';

import { API, isNetworkError } from './httpService';
import { getStoredRefreshToken, getStoredAuthToken } from './userService';
import { throwServerNotReachableError } from '../utilities/errorHandler/errorHandler';

const AUTHENTICATE_ENDPOINT = 'auth/token';
const AUTHORIZE_ENDPOINT = 'auth/authorize';

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
    .post( API + AUTHENTICATE_ENDPOINT, data, { headers } )
    .catch( err => isNetworkError( err ) && throwServerNotReachableError() );

export const getAuthorizeCode = ( clientId, state, redirectUri ) => {
    const params = `?client_id=${ clientId }&response_type=code&state=${ state }&redirect_uri=${ redirectUri }`;
    return fetch( `${ API }${ AUTHORIZE_ENDPOINT }${ params }`, { headers: getCodeHeaders() } );
};

/**
 *  refreshAuthToken gets called to retrieve a new access token via the refresh token
 * @param {Function} resolve
 */
export const refreshAuthToken = ( resolve ) => {
    const headers = getTokenHeaders();
    const refreshToken = getStoredRefreshToken();
    const params = `?grant_type=${ GRANT_TYPES.REFRESH_TOKEN }&refresh_token=${ refreshToken }`;
    const data = {
        grant_type: GRANT_TYPES.REFRESH_TOKEN,
        refresh_token: refreshToken,
    };
    postAuthRequest( params, data, headers )
        .then( () => resolve() )
        .catch( err => isNetworkError( err ) && throwServerNotReachableError() );
};
