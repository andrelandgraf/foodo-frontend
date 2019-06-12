import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { KEYS } from '../../utilities/internationalization/internationalization';

import LoginView from '../../views/loginView';
import MessageComponent, { MESSAGE_TYPES } from '../../components/message/message';

import { logUserIn } from '../../services/userService';

class LoginContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            message: '',
            messageType: undefined,
        };
    }

    handleUsernameChange = ( event ) => {
        this.setState( { username: event.target.value } );
    }

    handlePasswordChange = ( event ) => {
        this.setState( { password: event.target.value } );
    }

    handleSubmit = async ( event ) => {
        event.preventDefault();
        const { username, password } = this.state;
        const { onSubmit, setUser } = this.props;
        if ( username.length < 2 || password === '' ) {
            return false;
        }
        this.setState( { isLoading: true } );
        if ( !onSubmit ) {
            // default behavior (normal login page)
            return logUserIn( username, password )
                .then( ( user ) => {
                    setUser( user );
                    return true;
                } )
                .catch( err => this.handleError( err ) );
        }
        // register, oAuth or other extensive behavior
        return onSubmit( username, password )
            .catch( err => this.handleError( err ) );
    }

    handleError = ( err ) => {
        this.setState( {
            isLoading: false,
            message: err.message,
            messageType: MESSAGE_TYPES.ERR,
        } );
        return false;
    }

    clearMessage = () => {
        this.setState( { message: '' } );
    }

    renderMessage = ( message, messageType ) => (
        <MessageComponent type={messageType} text={message} onResolve={this.clearMessage} />
    )

    renderLoginForm = ( username, password, pageName, actionName, Message, isLoading ) => (
        <LoginView
            pageName={pageName}
            actionName={actionName}
            username={username}
            password={password}
            Message={Message}
            onUsernameChange={this.handleUsernameChange}
            onPasswordChange={this.handlePasswordChange}
            onSubmit={this.handleSubmit}
            isLoading={isLoading}
        />
    );

    render() {
        const {
            username, password, isLoading, message, messageType,
        } = this.state;
        let Message;
        if ( message ) { Message = this.renderMessage( message, messageType ); }
        const { pageName, actionName } = this.props;
        return this.renderLoginForm( username, password, pageName, actionName, Message, isLoading );
    }
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
