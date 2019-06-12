export class CustomError extends Error {
    isCustomError = true;

    constructor( ...args ) {
        super( ...args );
        Error.captureStackTrace( this, CustomError );
    }
}

export class ServerNotReachableError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        Error.captureStackTrace( this, ServerNotReachableError );
    }
}

export class NotAuthorizedError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        Error.captureStackTrace( this, NotAuthorizedError );
    }
}

export class WrongCredentialsError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        Error.captureStackTrace( this, WrongCredentialsError );
    }
}

export class UsernameAlreadyTakenError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        Error.captureStackTrace( this, WrongCredentialsError );
    }
}

export class RequestParameterMissingError extends CustomError {
    constructor( ...args ) {
        super( ...args );
        Error.captureStackTrace( this, RequestParameterMissingError );
    }
}
