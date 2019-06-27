import { NONAUTH_ROUTES, AUTH_ROUTES } from '../container/App/App';

export const setRedirectUrl = url => window.sessionStorage.setItem( 'redirectUrl', url );

export const getRedirectUrl = () => window.sessionStorage.getItem( 'redirectUrl' ) || AUTH_ROUTES.HOME;

export const isValidRedirectUrl = path => !path.startsWith( NONAUTH_ROUTES.LOGIN )
                                    && !path.startsWith( NONAUTH_ROUTES.Reg );
