import { ENDPOINTS } from '../api';
import { postRequest, getRequest } from '../httpService';

export const getGoals = () => getRequest( ENDPOINTS.GOAL );

export const getLifestyles = () => getRequest( ENDPOINTS.LIFESTYLE );

export const getAllergies = () => getRequest( ENDPOINTS.ALLERGY );

export const postGoal = ( userId, goal ) => postRequest(
    `${ ENDPOINTS.USER }${ userId }${ ENDPOINTS.USER_ENDPOINTS.GOAL }`, { goal },
);

export const postLifestyle = ( userId, lifestyle ) => postRequest(
    `${ ENDPOINTS.USER }${ userId }${ ENDPOINTS.USER_ENDPOINTS.LIFESTYLE }`, { lifestyle },
);

export const postDislikes = ( userId, dislikes ) => postRequest(
    `${ ENDPOINTS.USER }${ userId }${ ENDPOINTS.USER_ENDPOINTS.DISLIKE }`, { dislikes },
);

export const postAllergies = ( userId, allergies ) => postRequest(
    `${ ENDPOINTS.USER }${ userId }${ ENDPOINTS.USER_ENDPOINTS.ALLERGY }`, { allergies },
);
