import React from 'react';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import { changePassword } from '../../services/foodo-api/user/userService';

import PasswordForm from '../../components/password/password';
import Message, { MESSAGE_TYPES } from '../../components/message/message';


class PasswordContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            password: '',
            message: '',
            messageType: undefined,
        };
    }

    handlePasswordChange = ( event ) => {
        this.setState( { password: event.target.value } );
    }

    handleSubmit = async ( event ) => {
        event.preventDefault();
        const { password } = this.state;
        changePassword( password ).then( () => this.setState( {
            message: i18n.t( KEYS.MESSAGES.PASSWORD_CHANGED ),
            messageType: MESSAGE_TYPES.SUCCESS,
        } ) );
        this.setState( { password: '' } );
    }

    clearMessage = () => {
        this.setState( { message: '', messageType: undefined } );
    }

    renderMessage = ( message, messageType ) => (
        <Message type={messageType} text={message} onResolve={this.clearMessage} />
    )

    renderPasswordForm = password => (
        <PasswordForm
            password={password}
            isLoading={false}
            onPasswordChange={this.handlePasswordChange}
            onSubmit={this.handleSubmit}
        />
    );

    render() {
        const { password, message, messageType } = this.state;
        return (
            <>
                { message && this.renderMessage( message, messageType ) }
                { this.renderPasswordForm( password ) }
            </>
        );
    }
}

export default PasswordContainer;
