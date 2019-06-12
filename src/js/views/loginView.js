import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from '../components/login/loginForm';

const LoginView = ( {
    username, password, pageName, actionName, Message,
    onUsernameChange, onPasswordChange, onSubmit, isLoading,
} ) => (
    <div className="container login-container">
        <h1>{pageName}</h1>
        { Message }
        <LoginForm
            actionName={actionName}
            username={username}
            password={password}
            onUsernameChange={onUsernameChange}
            onPasswordChange={onPasswordChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
        />
    </div>
);

LoginView.propTypes = {
    pageName: PropTypes.string.isRequired,
    actionName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    Message: PropTypes.node,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

LoginView.defaultProps = {
    Message: undefined,
};

export default LoginView;
