import axios from 'axios';

import Logger from '../../utilities/Logger';
import { isUnauthorizedError, isNetworkError } from '../utilities/httpProtocol';
import { throwServerNotReachableError } from '../../utilities/errorHandler/errorHandler';
import { API } from './api';
import { refreshAuthToken } from './oAuthService';
import { getStoredAuthToken } from './user/userService';

const LoggingUtility = new Logger( 'userService.js' );

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

export const postRequest = ( endpoint, data ) => axios
    .post( API + endpoint, data, { headers: postHeaders() } )
    .then( res => res.data )
    .catch( ( err ) => {
        LoggingUtility.error( `Error in post request to entpoint ${ endpoint }`, err );
        if ( isNetworkError( err ) ) {
            throwServerNotReachableError();
        }
        const { status } = err.response;
        if ( isUnauthorizedError( status ) ) {
            return refreshAuthToken(
                () => postRequest( endpoint, data ),
            );
        }
        throw Error( `${ err.response.data.code }:${ err.response.message }` );
    } );

export const putRequest = ( endpoint, data ) => axios
    .put( API + endpoint, data, { headers: postHeaders() } )
    .then( res => res.data )
    .catch( ( err ) => {
        LoggingUtility.error( `Error in put request to entpoint ${ endpoint }`, err );
        if ( isNetworkError( err ) ) {
            throwServerNotReachableError();
        }
        const { status } = err.response;
        if ( isUnauthorizedError( status ) ) {
            return refreshAuthToken(
                () => putRequest( endpoint, data ),
            );
        }
        throw Error( `${ err.response.data.code }:${ err.response.message }` );
    } );

export const deleteRequest = ( endpoint, data ) => axios
    .delete( API + endpoint, { headers: postHeaders(), data } )
    .then( res => res.data )
    .catch( ( err ) => {
        LoggingUtility.error( `Error in delete request to entpoint ${ endpoint }`, err );
        if ( isNetworkError( err ) ) {
            throwServerNotReachableError();
        }
        const { status } = err.response;
        if ( isUnauthorizedError( status ) ) {
            return refreshAuthToken(
                () => deleteRequest( endpoint, data ),
            );
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
        const { status } = err.response;
        if ( isUnauthorizedError( status ) ) {
            return refreshAuthToken(
                () => getRequest( endpoint ),
            );
        }
        throw Error( `${ err.response.data.code }:${ err.response.message }` );
    } );
