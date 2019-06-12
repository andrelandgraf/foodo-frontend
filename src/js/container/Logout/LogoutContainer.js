import React from 'react';
import PropTypes from 'prop-types';

import { UserStateContext } from '../../provider/UserStateProvider';
import { isAuthenticated } from '../../services/userService';

const LogoutContainer = ( { LogoutComponent, onWillLogout } ) => (
    <UserStateContext.Consumer>
        { ( { setUser } ) => (
            <LogoutComponent
                onWillLogout={onWillLogout}
                setUser={setUser}
                loggedIn={isAuthenticated()}
            />
        )}
    </UserStateContext.Consumer>
);

LogoutContainer.propTypes = {
    LogoutComponent: PropTypes.oneOfType( [
        PropTypes.func.isRequired,
        PropTypes.node.isRequired,
    ] ).isRequired,
    onWillLogout: PropTypes.func,
};

LogoutContainer.defaultProps = {
    onWillLogout: undefined,
};

export default LogoutContainer;
