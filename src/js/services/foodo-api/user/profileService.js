import { ENDPOINTS } from '../api';
import {
    postRequest, getRequest, putRequest, deleteRequest,
} from '../httpService';

export const getGoals = () => getRequest( ENDPOINTS.GOAL );

export const getLifestyles = () => getRequest( ENDPOINTS.LIFESTYLE );

export const getAllergies = () => getRequest( ENDPOINTS.ALLERGY );

export const postGoal = goal => postRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.GOAL }`, { goal },
);

export const postLifestyle = lifestyle => postRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.LIFESTYLE }`, { lifestyle },
);

export const putDislike = dislike => putRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.DISLIKE }`, { dislike },
);

export const putAllergy = allergy => putRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.ALLERGY }`, { allergy },
);

export const deleteDislike = dislike => deleteRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.DISLIKE }`, { dislike },
);

export const deleteAllergy = allergy => deleteRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.ALLERGY }`, { allergy },
);
