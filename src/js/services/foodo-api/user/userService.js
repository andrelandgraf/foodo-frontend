import qs from 'qs';

import Logger from '../../../utilities/Logger';
import { throwWrongCredentialsError, throwUsernameAlreadyTaken, isCustomError } from '../../../utilities/errorHandler/errorHandler';
import { ENDPOINTS } from '../api';
import {
    GRANT_TYPES, getTokenHeaders, postAuthRequest, getAuthorizeCode,
} from '../oAuthService';
import { postRequest, getRequest, putRequest } from '../httpService';

const LoggingUtility = new Logger( 'userService.js' );

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
export const authenticate = ( data, header ) => (
    postAuthRequest( qs.stringify( data ), header )
        .then( ( res ) => {
            console.log( 'we were able to authenticate with refresh token' );
            setStoredAuthToken( res.data.accessToken );
            setStoredRefreshToken( res.data.refreshToken );
            return res.data.user;
        } )
        .catch( ( err ) => {
            console.log( 'authenticated fail, throw errorx' );
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

export const registerUser = ( user ) => {
    if ( !user || !user.username || !user.password || !user.locale ) {
        throw new Error( 'passed user object misses required fields' );
    }
    const { username, password } = user;
    return postRequest( ENDPOINTS.REGISTER, { user } )
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

export const getUser = () => getRequest( `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.ME }` );

export const logUserOut = () => {
    window.localStorage.removeItem( 'authToken' );
    window.localStorage.removeItem( 'refreshToken' );
};

export const isAuthenticated = () => !!getStoredAuthToken();

export const changePassword = password => putRequest( ENDPOINTS.PASSWORD, { password } );
