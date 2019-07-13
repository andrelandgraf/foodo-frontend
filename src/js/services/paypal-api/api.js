import { isDevelopment } from '../../utilities/env';

const SANDBOX = 'https://api.sandbox.paypal.com/';
// eslint-disable-next-line no-unused-vars
const LIVE = 'https://api.paypal.com/';

export const API = isDevelopment ? SANDBOX : SANDBOX;
export const ENDPOINTS = {
    AUTHENTICATE: 'v1/oauth2/token',
};
