function configureStackTrace( objectRef, className ) {
    if ( Error.captureStackTrace ) {
        Error.captureStackTrace( objectRef, className );
    }
}

export class CustomError extends Error {
    isCustomError = true;

    constructor( ...args ) {
        super( ...args );
        configureStackTrace( this, CustomError );
    }
}

export class ServerNotReachableError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        configureStackTrace( this, ServerNotReachableError );
    }
}

export class NotAuthorizedError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        configureStackTrace( this, NotAuthorizedError );
    }
}

export class WrongCredentialsError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        configureStackTrace( this, WrongCredentialsError );
    }
}

export class UsernameAlreadyTakenError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        configureStackTrace( this, UsernameAlreadyTakenError );
    }
}

export class RequestParameterMissingError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        configureStackTrace( this, RequestParameterMissingError );
    }
}
