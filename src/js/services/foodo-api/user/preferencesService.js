import { ENDPOINTS } from '../api';
import { postRequest } from '../httpService';

// eslint-disable-next-line import/prefer-default-export
export const postLocale = locale => postRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.LOCALE }`, { locale },
);
