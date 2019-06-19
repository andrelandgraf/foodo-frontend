import React from 'react';

import { changePassword } from '../../services/foodo-api/user/userService';

import Password from '../../components/password/password';
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
            message: 'Password successfully changed',
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

    renderPassword = password => (
        <Password
            password={password}
            isLoading={false}
            onPasswordChange={this.handlePasswordChange}
            onSubmit={this.handleSubmit}
        />
    );

    render() {
        const { password, message, messageType } = this.state;
        return (
            <React.Fragment>
                { message && this.renderMessage( message, messageType ) }
                { this.renderPassword( password ) }
            </React.Fragment>
        );
    }
}

export default PasswordContainer;
