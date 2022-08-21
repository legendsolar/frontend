interface BasicError {
    source?: string;
    message: string;
}

export enum ErrorTypes {
    ValidationError = 'ValidationError',
    SystemError = 'SystemError',
    InternalStateErorr = 'InternalStateError',
    MfaRequiredError = 'MfaRequiredError',
    NewLogInRequired = 'NewLogInRequired',
    DwollaError = 'DwollaError',
    AuthenticationError = 'AuthenticationError',
}

export const throwValidationError = (error: BasicError): never => {
    throw {
        type: ErrorTypes.ValidationError,
        source: error.source,
        message: error.message,
    };
};

/**
 * To be used for some benign backend or external system error
 * @param {*} error
 */
export const throwInternalStateError = (error: BasicError): never => {
    throw {
        type: ErrorTypes.SystemError,
        source: 'internalState',
        message: error.message,
    };
};

/**
 * To be used for some benign backend or external system error
 * @param {*} error
 */
export const throwSystemError = (error: BasicError): never => {
    throw {
        type: ErrorTypes.SystemError,
        source: 'system',
        message: error.message,
    };
};

// We want this to be a separate type to ensure MFA verify is handled properly
export const throwMfaRequiredError = (error: BasicError, resolver): never => {
    throw {
        type: ErrorTypes.MfaRequiredError,
        source: 'mfa',
        message: error.message,
        resolver,
    };
};

export const throwNewLogInRequired = (error: BasicError): never => {
    throw {
        type: ErrorTypes.NewLogInRequired,
        source: error.source,
        message: error.message,
    };
};

export const throwDwollaError = (error: BasicError): never => {
    throw {
        type: ErrorTypes.DwollaError,
        source: error.source,
        message: error.message,
    };
};

export const throwAuthenticationError = (error: BasicError): never => {
    throw {
        type: ErrorTypes.AuthenticationError,
        source: undefined,
        message: error.message,
    };
};
