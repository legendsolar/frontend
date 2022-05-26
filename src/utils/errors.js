export const ErrorTypes = {
    ValidationError: 'ValidationError',
    SystemError: 'SystemError',
    MfaRequiredError: 'MfaRequiredError',
    DwollaError: 'DwollaError',
    AuthenticationError: 'AuthenticationError',
};

export const throwValidationError = (error) => {
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
export const throwSystemError = (error) => {
    throw {
        type: ErrorTypes.SystemError,
        source: 'system',
        message: error.message,
    };
};

// We want this to be a separate type to ensure MFA verify is handled properly
export const throwMfaRequiredError = (error, resolver) => {
    throw {
        type: ErrorTypes.MfaRequiredError,
        source: 'mfa',
        message: error.message,
        resolver,
    };
};

export const throwDwollaError = (error) => {
    throw {
        type: ErrorTypes.DwollaError,
        source: error.source,
        message: error.message,
    };
};

export const throwAuthenticationError = (error) => {
    throw {
        type: ErrorTypes.AuthenticationError,
        source: undefined,
        message: error.message,
    };
};
