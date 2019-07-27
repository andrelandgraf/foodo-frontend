import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import { getRedirectUrl, setRedirectUrl, isValidRedirectUrl } from '../../utilities/redirect';

import { getUser, logUserOut, isLoggedIn } from '../../services/foodo-api/user/userService';
import { UserStateContext } from '../../provider/UserStateProvider';
import { IngredientsProvider } from '../../provider/IngredientsProvider';
import { GoalsLifestylesProvider } from '../../provider/GoalsLifestylesProvider';
import { AllergiesProvider } from '../../provider/AllergiesProvider';
import { RecipesProvider } from '../../provider/RecipesProvider';
import { UserRecipesProvider } from '../../provider/UserRecipesProvider';

import NavBarContainer from '../Navigation/NavBar/NavBarContainer';
import HomeContainer from '../Home/HomeContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import CookingView from '../../views/cookingView';
import NotFoundView from '../../views/notFoundView';
import PasswordView from '../../views/passwordView';
import SubscribeView from '../../views/subscribeView';
import AdminView from '../../views/adminView';
import Paywall, { ACCESS_RIGHTS } from '../Subscription/Paywall';
import StatisticsView from '../../views/statisticsView';
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
    STATISTICS: '/statistics',
    ADMIN: '/admin',
    CATEGORY: '/admin/setcategory',
    ALLERGIES: '/admin/setallergies',
    LIFESTYLES: '/admin/setlifestyles',
    PASSWORD: '/password',
    ABOUT: '/about',
    SUBSCRIBE: '/subscribe',
    OAUTH: '/oauth/v2/login',
};

export const NONAUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    ABOUT: '/about',
};

function App() {
    const { user, setUser } = useContext( UserStateContext );

    useEffect( () => {
        if ( isLoggedIn() && !user ) {
            // in case of page reload, we still hold token but need to get user again
            getUser()
                .then( ( retrievedUser ) => {
                    setUser( retrievedUser );
                } )
                .catch( () => {
                    // in case of error, relocate to login and retrieve new token
                    logUserOut();
                    setUser( undefined );
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                } );
        }
    }, [] );

    const renderAppLoading = () => (
        <Loader />
    );

    const renderApp = () => (
        <Switch>
            <Route exact path={AUTH_ROUTES.HOME} component={HomeContainer} />
            <Route exact path={AUTH_ROUTES.PROFILE} component={ProfileContainer} />
            <Route
                exact
                path={`${ AUTH_ROUTES.COOKING }:id`}
                render={() => (
                    <Paywall wants={ACCESS_RIGHTS.COOKING}>
                        <Route
                            exact
                            path={`${ AUTH_ROUTES.COOKING }:id`}
                            render={props => ( <CookingView {...props} /> )}
                        />
                    </Paywall>
                )}
            />
            <Route exact path={AUTH_ROUTES.STATISTICS} component={StatisticsView} />
            <Route exact path={AUTH_ROUTES.SUBSCRIBE} component={SubscribeView} />
            <Route exact path={AUTH_ROUTES.PASSWORD} component={PasswordView} />
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
                <Redirect path="*" to={NONAUTH_ROUTES.LOGIN} />
            </Switch>
        </>
    );

    if ( !isLoggedIn() ) {
        const redirectUrl = window.location.pathname;
        const isValid = isValidRedirectUrl( redirectUrl );
        if ( !isValid ) {
            setRedirectUrl( AUTH_ROUTES.HOME );
        } else {
            setRedirectUrl( redirectUrl + window.location.search );
        }
    }

    return (
        <Router>
            <div>
                { isLoggedIn()
                    ? renderAuthenticatedApp()
                    : renderNotAuthenticatedApp()
                }
            </div>
        </Router>
    );
}

export default App;
