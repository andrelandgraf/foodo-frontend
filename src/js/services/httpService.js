import axios from 'axios';

import Logger from '../utilities/Logger';
import { isDevelopment } from '../utilities/env';
import { throwServerNotReachableError, handleUnauthorizedError } from '../utilities/errorHandler/errorHandler';
import { refreshAuthToken } from './oAuthService';
import { getStoredAuthToken } from './userService';

const LoggingUtility = new Logger( 'userService.js' );

export const API = isDevelopment ? 'http://localhost:3333/' : process.env.REACT_APP_BACKEND_API;
const HTTP_CODE_UNAUTHORIZED = 401;

function getHeaders() {
    return {
        accept: 'application/json',
        authorization: `Bearer ${ getStoredAuthToken() }`,
    };
}

function postHeaders() {
    return {
        'content-type': 'application/json',
        authorization: `Bearer ${ getStoredAuthToken() }`,
    };
}

export const isNetworkError = err => !err.status && err.message === 'Network Error';
export const isUnauthorizedError = err => Number( err.code ) === HTTP_CODE_UNAUTHORIZED;

export const postRequest = ( endpoint, data ) => axios
    .post( API + endpoint, data, { headers: postHeaders() } )
    .then( ( res ) => {
        if ( res === 401 ) {
            return refreshAuthToken(
                () => postRequest( endpoint, data ),
            );
        }
        return res.data;
    } )
    .catch( ( err ) => {
        LoggingUtility.error( `Error in post request to entpoint ${ endpoint }`, err );
        if ( isNetworkError( err ) ) {
            throwServerNotReachableError();
        }
        if ( isUnauthorizedError( err ) ) {
            handleUnauthorizedError();
        }
        throw Error( `${ err.response.data.code }:${ err.response.message }` );
    } );

export const getRequest = endpoint => axios
    .get( API + endpoint, { headers: getHeaders() } )
    .then( res => res.data )
    .catch( ( err ) => {
        LoggingUtility.error( `Error in get request to entpoint ${ endpoint }`, err );
        if ( isNetworkError( err ) ) {
            throwServerNotReachableError();
        }
        if ( isUnauthorizedError( err ) ) {
            console.log( err );
            console.log( err.code );
            console.log( err.status );
            handleUnauthorizedError();
        }
        throw Error( `${ err.response.data.code }:${ err.response.message }` );
    } );
