import { ENDPOINTS } from '../api';
import { postRequest } from '../httpService';

// eslint-disable-next-line import/prefer-default-export
export const postLocale = ( userId, locale ) => postRequest(
    `${ ENDPOINTS.USER }${ userId }${ ENDPOINTS.USER_ENDPOINTS.LOCALE }`, { locale },
);
