import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AUTH_ROUTES, NONAUTH_ROUTES } from '../App/App';

import { LayoutContext } from '../../provider/LayoutProvider';
import { isLoggedIn } from '../../services/foodo-api/user/userService';
import AboutView from '../../components/view/aboutView';

/**
 * AboutContainer for the about page
 */
function AboutContainer() {
    const { showNavBar, setShowNavBar } = useContext( LayoutContext );
    const [ clickedGetStarted, setClickedGetStarted ] = useState( false );

    useEffect( () => {
        // only show the navbar if we are loggedin or explicitly stated by showNavBar
        if ( !isLoggedIn() && showNavBar ) {
            setShowNavBar( false );
        }
        return () => setShowNavBar( true );
    }, [] );

    const onClickGetStarted = () => setClickedGetStarted( true );

    return (
        <>
            { clickedGetStarted
                ? (
                    <Redirect
                        push
                        to={isLoggedIn() ? AUTH_ROUTES.HOME : NONAUTH_ROUTES.REGISTER}
                    />
                )
                : <AboutView onClickGetStarted={onClickGetStarted} />
            }
        </>
    );
}

export default AboutContainer;
