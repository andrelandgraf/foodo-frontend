import React from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import { UserStateContext } from '../../provider/UserStateProvider';

import NavBarContainer from '../NavBar/NavBarContainer';
import HomeView from '../../views/homeView';
import ProfileView from '../../views/profileView';
import NotFoundView from '../../views/notFoundView';
import LoginContainer from '../Login/LoginContainer';
import RegistrationContainer from '../Registration/RegistrationContainer';
import OAuthContainer from '../OAuth/OAuthContainer';
import Loader from '../../components/loading/loader';

import { isAuthenticated, getUser } from '../../services/userService';

export const AUTH_ROUTES = {
    HOME: '/',
    PROFILE: '/profile',
    OAUTH: '/oauth/v2/login',
};

export const NONAUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    OAUTH: '/oauth/v2/login',
};

class App extends React.Component {
    componentWillMount = async () => {
        const { user, setUser } = this.context;
        // in case of page reload, we still hold token but need to get user again
        if ( isAuthenticated() && !user ) this.getUser( setUser );
    }

    scrollToTop = () => {
        window.scrollTo( 0, 0 );
        return null;
    };

    getUser = async ( setUser ) => {
        await getUser()
            .then( retrievedUser => setUser( retrievedUser ) )
            .catch( () => {
                // in case of error, relocate to login and retrieve new token
                window.localStorage.clear();
            } );
    }

    renderAppLoading = () => (
        <Loader />
    );

    renderApp = user => (
        <Switch>
            <Route
                exact
                path={AUTH_ROUTES.HOME}
                render={props => ( <HomeView {...props} user={user} /> )}
            />
            <Route
                exact
                path={AUTH_ROUTES.PROFILE}
                render={props => ( <ProfileView {...props} user={user} /> )}
            />
            <Route from={AUTH_ROUTES.OAUTH} component={OAuthContainer} />
            <Redirect from={NONAUTH_ROUTES.LOGIN} to={window.localStorage.getItem( 'redirectUrl' )} />
            <Redirect from={NONAUTH_ROUTES.REGISTER} to={window.localStorage.getItem( 'redirectUrl' )} />
            <Route from="*" component={NotFoundView} />
        </Switch>
    );

    renderAuthenticatedApp = user => (
        <React.Fragment>
            <NavBarContainer loggedIn />
            {
                user ? this.renderApp( user ) : this.renderAppLoading()
            }
        </React.Fragment>
    );

    renderNotAuthenticatedApp = setUser => (
        <React.Fragment>
            <NavBarContainer loggedIn={false} />
            <Switch>
                <Route
                    from={NONAUTH_ROUTES.LOGIN}
                    render={props => (
                        <LoginContainer {...props} setUser={setUser} />
                    )}
                />
                <Route
                    from={NONAUTH_ROUTES.REGISTER}
                    render={props => (
                        <RegistrationContainer {...props} setUser={setUser} />
                    )}
                />
                <Route from={NONAUTH_ROUTES.OAUTH} component={OAuthContainer} />
                <Redirect path="*" to={NONAUTH_ROUTES.LOGIN} />
            </Switch>
        </React.Fragment>
    )

    render() {
        const { user, setUser } = this.context;

        if ( !isAuthenticated() ) {
            let redirectUrl = window.location.pathname;
            const isValid = Object.keys( AUTH_ROUTES )
                .find( key => AUTH_ROUTES[ key ].startsWith( redirectUrl ) );
            if ( !isValid ) {
                redirectUrl = '/';
            }
            window.localStorage.setItem( 'redirectUrl', redirectUrl );
        }
        return (
            <Router>
                <div>
                    <Route component={this.scrollToTop} />
                    { isAuthenticated()
                        ? this.renderAuthenticatedApp( user )
                        : this.renderNotAuthenticatedApp( setUser )
                    }
                </div>
            </Router>
        );
    }
}

App.contextType = UserStateContext;

export default App;
