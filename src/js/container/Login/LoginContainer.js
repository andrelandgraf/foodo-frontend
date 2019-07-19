import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS, getLocale, setLocale } from '../../utilities/internationalization/internationalization';

import LoginView from '../../views/loginView';
import MessageComponent, { MESSAGE_TYPES } from '../../components/message/message';

import { logUserIn } from '../../services/foodo-api/user/userService';

function LoginContainer( {
    setUser, onSubmit, pageName, actionName,
} ) {
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ message, setMessage ] = useState( '' );
    const [ messageType, setMessageType ] = useState();

    const handleUsernameChange = useCallback( ( event ) => {
        setUsername( event.target.value );
    }, [] );

    const handlePasswordChange = useCallback( ( event ) => {
        setPassword( event.target.value );
    }, [] );

    const handleError = useCallback( ( err ) => {
        setIsLoading( false );
        setMessage( err.message );
        setMessageType( MESSAGE_TYPES.ERR );
        return false;
    }, [] );

    const handleSubmit = useCallback( async ( event ) => {
        event.preventDefault();

        if ( username.length < 2 || password === '' ) {
            return false;
        }
        setIsLoading( true );
        if ( !onSubmit ) {
            // default behavior (normal login page)
            return logUserIn( username, password )
                .then( async ( user ) => {
                    setUser( user );
                    if ( user && user.locale
                        && getLocale() !== user.locale ) {
                        await setLocale( user.locale );
                        // completly reload and rerender all components to change language strings
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                    }
                    return true;
                } )
                .catch( err => handleError( err ) );
        }
        // register, oAuth or other extensive behavior
        return onSubmit( username, password )
            .catch( err => handleError( err ) );
    }, [ username, password ] );

    const clearMessage = useCallback( () => {
        setMessage( '' );
        setMessageType( undefined );
    }, [] );

    const renderMessage = () => (
        <MessageComponent type={messageType} message={message} onResolve={clearMessage} />
    );

    const renderLoginForm = Message => (
        <LoginView
            pageName={pageName}
            actionName={actionName}
            username={username}
            password={password}
            Message={Message}
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );

    let Message;
    if ( message ) { Message = renderMessage(); }
    return renderLoginForm( Message );
}

LoginContainer.propTypes = {
    pageName: PropTypes.string,
    actionName: PropTypes.string,
    onSubmit: PropTypes.func,
    setUser: PropTypes.func,
};

LoginContainer.defaultProps = {
    pageName: i18n.t( KEYS.LABELS.LOGIN ),
    actionName: i18n.t( KEYS.LABELS.LOGIN ),
    onSubmit: undefined,
    setUser: undefined,
};

export default LoginContainer;
