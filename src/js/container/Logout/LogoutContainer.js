import React from 'react';
import PropTypes from 'prop-types';

import { UserStateContext } from '../../provider/UserStateProvider';
import { isLoggedIn } from '../../services/foodo-api/user/userService';

const LogoutContainer = ( { LogoutComponent, onWillLogout } ) => (
    <UserStateContext.Consumer>
        { ( { setUser } ) => (
            <LogoutComponent
                onWillLogout={onWillLogout}
                setUser={setUser}
                loggedIn={isLoggedIn()}
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
