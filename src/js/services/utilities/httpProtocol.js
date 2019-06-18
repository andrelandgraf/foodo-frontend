export const HTTP_CODE_UNAUTHORIZED = 401;
export const HTTP_CODE_SERVICE_UNAVAILABLE = 503;

export const isNetworkError = err => ( err.message === 'Network Error' )
    || ( err.response && Number( err.response.status ) === HTTP_CODE_SERVICE_UNAVAILABLE );

export const isUnauthorizedError = status => Number( status ) === HTTP_CODE_UNAUTHORIZED;
