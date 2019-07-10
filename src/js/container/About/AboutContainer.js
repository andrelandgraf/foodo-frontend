import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AUTH_ROUTES, NONAUTH_ROUTES } from '../App/App';

import { LayoutContext } from '../../provider/LayoutProvider';
import { isAuthenticated } from '../../services/foodo-api/user/userService';
import AboutView from '../../views/aboutView';

function AboutContainer() {
    const { showNavBar, setShowNavBar } = useContext( LayoutContext );
    const [ clickedGetStarted, setClickedGetStarted ] = useState( false );

    useEffect( () => {
        if ( !isAuthenticated() && showNavBar ) {
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
                        to={isAuthenticated() ? AUTH_ROUTES.HOME : NONAUTH_ROUTES.REGISTER}
                    />
                )
                : <AboutView onClickGetStarted={onClickGetStarted} />
            }
        </>
    );
}

export default AboutContainer;
