import React from 'react';

import Password from '../../components/password/password';
import { changePassword } from '../../services/foodo-api/user/userService';


class PasswordContainer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            password: '',
        };
    }

    handlePasswordChange = ( event ) => {
        this.setState( { password: event.target.value } );
    }

    handleSubmit = async ( event ) => {
        event.preventDefault();
        const { password } = this.state;
        changePassword( password );
        this.setState( { password: '' } );
    }

    renderPassword = password => (
        <Password
            password={password}
            isLoading={false}
            onPasswordChange={this.handlePasswordChange}
            onSubmit={this.handleSubmit}
        />
    );

    render() {
        const { password } = this.state;
        return this.renderPassword( password );
    }
}

export default PasswordContainer;
