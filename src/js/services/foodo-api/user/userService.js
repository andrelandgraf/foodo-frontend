import Logger from '../../../utilities/Logger';
import { throwUsernameAlreadyTaken, isCustomError } from '../../../utilities/errorHandler/errorHandler';
import { ENDPOINTS } from '../api';
import {
    GRANT_TYPES, unsetStoredTokens, authenticate, isAuthenticated,
} from '../oAuthService';
import { postRequest, getRequest, putRequest } from '../httpService';

const LoggingUtility = new Logger( 'userService.js' );

export const isLoggedIn = () => isAuthenticated();

export const logUserIn = ( username, password ) => {
    const data = {
        grant_type: GRANT_TYPES.PASSWORD,
        username,
        password,
    };
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_KEY_ID;
    const clientSecret = process.env.REACT_APP_OAUTH_CLIENT_SECRET_KEY;
    return authenticate( clientId, clientSecret, data );
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

export const getUser = () => getRequest( `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.ME }` );

export const logUserOut = () => unsetStoredTokens();

export const changePassword = password => putRequest( ENDPOINTS.PASSWORD, { password } );
