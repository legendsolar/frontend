export const ErrorTypes = {
    ValidationError: 'ValidationError',
    SystemError: 'SystemError',
    DwollaError: 'DwollaError',
};

export const throwValidationError = (error) => {
    throw {
        type: ErrorTypes.ValidationError,
        source: error.source,
        message: error.message,
    };
};

export const throwSystemError = (error) => {
    throw {
        type: ErrorTypes.SystemError,
        source: 'system',
        message: error.message,
    };
};

export const throwDwollaError = (error) => {
    throw {
        type: ErrorTypes.DwollaError,
        source: error.source,
        message: error.message,
    };
};
