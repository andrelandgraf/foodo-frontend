import React from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import { UserStateContext } from '../../provider/UserStateProvider';

import NavBarContainer from '../NavBar/NavBarContainer';
import HomeView from '../../views/homeView';
import ProfileView from '../../views/profileView';
import CookingView from '../../views/cookingView';
import NotFoundView from '../../views/notFoundView';
import PasswordView from '../../views/passwordView';
import AdminView from '../../views/adminView';
import LoginContainer from '../Login/LoginContainer';
import RegistrationContainer from '../Registration/RegistrationContainer';
import OAuthContainer from '../OAuth/OAuthContainer';
import Loader from '../../components/loading/loader';

import { isAuthenticated, getUser, logUserOut } from '../../services/foodo-api/user/userService';
import { IngredientsProvider } from '../../provider/IngredientsProvider';
import { GoalsLifestylesProvider } from '../../provider/GoalsLifestylesProvider';
import { AllergiesProvider } from '../../provider/AllergiesProvider';
import { RecipesProvider } from '../../provider/RecipesProvider';

export const AUTH_ROUTES = {
    HOME: '/',
    PROFILE: '/profile',
    COOKING: '/cooking/',
    ADMIN: '/admin',
    OAUTH: '/oauth/v2/login',
    PASSWORD: '/password',
};

export const NONAUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    OAUTH: '/oauth/v2/login',
};

class App extends React.Component {
    componentDidMount = async () => {
        const { user, setUser } = this.context;
        // in case of page reload, we still hold token but need to get user again
        if ( isAuthenticated() && !user ) this.getUser( setUser );
    }

    pathInZone = ( path, zone ) => Object
        .keys( zone )
        .find( key => zone[ key ].startsWith( path ) );

    scrollToTop = () => {
        window.scrollTo( 0, 0 );
        return null;
    };

    getUser = ( setUser ) => {
        getUser()
            .then( retrievedUser => setUser( retrievedUser ) )
            .catch( () => {
                // in case of error, relocate to login and retrieve new token
                logUserOut();
                setUser( undefined );
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
                component={ProfileView}
            />
            <Route
                exact
                path={`${ AUTH_ROUTES.COOKING }:id`}
                render={props => ( <CookingView {...props} /> )}
            />
            <Route
                exact
                path={AUTH_ROUTES.PASSWORD}
                component={PasswordView}
            />
            <Route from={AUTH_ROUTES.ADMIN} component={AdminView} />
            <Route from={AUTH_ROUTES.OAUTH} component={OAuthContainer} />
            <Redirect from={NONAUTH_ROUTES.LOGIN} to={window.localStorage.getItem( 'redirectUrl' )} />
            <Redirect from={NONAUTH_ROUTES.REGISTER} to={window.localStorage.getItem( 'redirectUrl' )} />
            <Route from="*" component={NotFoundView} />
        </Switch>
    );

    renderAuthenticatedApp = user => (
        <React.Fragment>
            <NavBarContainer loggedIn />
            <RecipesProvider>
                <IngredientsProvider>
                    <GoalsLifestylesProvider>
                        <AllergiesProvider>
                            {
                                user ? this.renderApp( user ) : this.renderAppLoading()
                            }
                        </AllergiesProvider>
                    </GoalsLifestylesProvider>
                </IngredientsProvider>
            </RecipesProvider>
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
            const isValid = this.pathInZone( redirectUrl, AUTH_ROUTES );
            if ( !isValid ) {
                redirectUrl = '/';
            }
            window.localStorage.setItem( 'redirectUrl', redirectUrl );
        }
        return (
            <Router>
                <div>
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
