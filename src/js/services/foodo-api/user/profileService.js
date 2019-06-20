import { ENDPOINTS } from '../api';
import {
    postRequest, getRequest, putRequest, deleteRequest,
} from '../httpService';

export const getGoals = () => getRequest( ENDPOINTS.GOALS );

export const getLifestyles = () => getRequest( ENDPOINTS.LIFESTYLES );

export const getAllergies = () => getRequest( ENDPOINTS.ALLERGIES );

export const postGoal = goal => postRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.GOAL }`, { goal },
);

export const postLifestyle = lifestyle => postRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.LIFESTYLE }`, { lifestyle },
);

export const putDislike = dislike => putRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.DISLIKES }`, { dislike },
);

export const putAllergy = allergy => putRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.ALLERGIES }`, { allergy },
);

export const deleteDislike = dislike => deleteRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.DISLIKES }`, { dislike },
);

export const deleteAllergy = allergy => deleteRequest(
    `${ ENDPOINTS.USER }${ ENDPOINTS.USER_ENDPOINTS.ALLERGIES }`, { allergy },
);
