import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import { getRedirectUrl, setRedirectUrl, isValidRedirectUrl } from '../../utilities/redirect';

import { isAuthenticated, getUser, logUserOut } from '../../services/foodo-api/user/userService';
import { UserStateContext } from '../../provider/UserStateProvider';
import { IngredientsProvider } from '../../provider/IngredientsProvider';
import { GoalsLifestylesProvider } from '../../provider/GoalsLifestylesProvider';
import { AllergiesProvider } from '../../provider/AllergiesProvider';
import { RecipesProvider } from '../../provider/RecipesProvider';
import { UserRecipesProvider } from '../../provider/UserRecipesProvider';

import NavBarContainer from '../NavBar/NavBarContainer';
import HomeView from '../../views/homeView';
import ProfileView from '../../views/profileView';
import CookingView from '../../views/cookingView';
import NotFoundView from '../../views/notFoundView';
import PasswordView from '../../views/passwordView';
import AdminView from '../../views/adminView';
import AboutContainer from '../About/AboutContainer';
import LoginContainer from '../Login/LoginContainer';
import RegistrationContainer from '../Registration/RegistrationContainer';
import OAuthContainer from '../OAuth/OAuthContainer';
import Loader from '../../components/loading/loader';
import SetCategoryContainer from '../Admin/SetCategoryContainer';
import SetAllergiesContainer from '../Admin/SetAllergiesContainer';
import SetLifestylesContainer from '../Admin/SetLifestylesContainer';

export const AUTH_ROUTES = {
    HOME: '/',
    PROFILE: '/profile',
    COOKING: '/cooking/',
    ADMIN: '/admin',
    CATEGORY: '/admin/setcategory',
    ALLERGIES: '/admin/setallergies',
    LIFESTYLES: '/admin/setlifestyles',
    PASSWORD: '/password',
    ABOUT: '/about',
    OAUTH: '/oauth/v2/login',
};

export const NONAUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    ABOUT: '/about',
    OAUTH: '/oauth/v2/login',
};

function App() {
    const { user, setUser } = useContext( UserStateContext );

    useEffect( () => {
        console.log( 'remounting stuff' );
        if ( isAuthenticated() && !user ) {
            console.log( 'user missing, get user again' );
            // in case of page reload, we still hold token but need to get user again
            getUser()
                .then( ( retrievedUser ) => {
                    console.log( 'we got:' );
                    console.log( retrievedUser );
                    setUser( retrievedUser );
                } )
                .catch( () => {
                    // in case of error, relocate to login and retrieve new token
                    console.log( 'error, lets log out and undefined user' );
                    logUserOut();
                    setUser( undefined );
                } );
        }
    }, [] );

    const renderAppLoading = () => (
        <Loader />
    );

    const renderApp = () => (
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
            <Route exact from={AUTH_ROUTES.ADMIN} component={AdminView} />
            <Route exact from={AUTH_ROUTES.CATEGORY} component={SetCategoryContainer} />
            <Route exact from={AUTH_ROUTES.ALLERGIES} component={SetAllergiesContainer} />
            <Route exact from={AUTH_ROUTES.LIFESTYLES} component={SetLifestylesContainer} />
            <Route exact from={AUTH_ROUTES.ABOUT} component={AboutContainer} />
            <Route from={AUTH_ROUTES.OAUTH} component={OAuthContainer} />
            <Redirect from={NONAUTH_ROUTES.LOGIN} to={getRedirectUrl()} />
            <Redirect from={NONAUTH_ROUTES.REGISTER} to={getRedirectUrl()} />
            <Route from="*" component={NotFoundView} />
        </Switch>
    );

    const renderAuthenticatedApp = () => (
        <>
            <NavBarContainer loggedIn />
            <IngredientsProvider>
                <RecipesProvider>
                    <UserRecipesProvider>
                        <GoalsLifestylesProvider>
                            <AllergiesProvider>
                                {
                                    user ? renderApp() : renderAppLoading()
                                }
                            </AllergiesProvider>
                        </GoalsLifestylesProvider>
                    </UserRecipesProvider>
                </RecipesProvider>
            </IngredientsProvider>
        </>
    );

    const renderNotAuthenticatedApp = () => (
        <>
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
                <Route from={AUTH_ROUTES.ABOUT} component={AboutContainer} />
                <Route from={NONAUTH_ROUTES.OAUTH} component={OAuthContainer} />
                <Redirect path="*" to={NONAUTH_ROUTES.LOGIN} />
            </Switch>
        </>
    );

    if ( !isAuthenticated() ) {
        let redirectUrl = window.location.pathname;
        const isValid = isValidRedirectUrl( redirectUrl );
        if ( !isValid ) {
            redirectUrl = '/';
        }
        setRedirectUrl( redirectUrl );
    }

    return (
        <Router>
            <div>
                { isAuthenticated()
                    ? renderAuthenticatedApp()
                    : renderNotAuthenticatedApp()
                }
            </div>
        </Router>
    );
}

export default App;
