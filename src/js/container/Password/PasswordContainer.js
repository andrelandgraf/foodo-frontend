import React, { useState } from 'react';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { changePassword } from '../../services/foodo-api/user/userService';

import PasswordForm from '../../components/password/password';
import Message, { MESSAGE_TYPES } from '../../components/message/message';

/**
 * Container for the change password Page
 */
function PasswordContainer() {
    const [ password, setPassword ] = useState( '' );
    const [ message, setMessage ] = useState( '' );
    const [ messageType, setMessageType ] = useState();

    const handlePasswordChange = event => setPassword( event.target.value );

    const handleSubmit = async ( event ) => {
        event.preventDefault();
        changePassword( password ).then( () => {
            setMessage( i18n.t( KEYS.MESSAGES.PASSWORD_CHANGED ) );
            setMessageType( MESSAGE_TYPES.SUCCESS );
        } );
        setPassword( '' );
    };

    const clearMessage = () => setMessage( '' );

    const renderMessage = () => (
        <Message type={messageType} message={message} onResolve={clearMessage} />
    );

    return (
        <>
            { message && renderMessage( message, messageType ) }
            <PasswordForm
                password={password}
                isLoading={false}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default PasswordContainer;
