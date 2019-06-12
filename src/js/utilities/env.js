const ENVIRONMENTS = {
    TEST: 'test',
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

export const isDevelopment = process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT;

export const isTest = process.env.NODE_ENV === ENVIRONMENTS.TEST;

export const isProduction = process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION;
