export const ErrorTypes = {
    ValidationError: 'ValidationError',
    DwollaError: 'DwollaError',
};

export const throwValidationError = (error) => {
    throw {
        type: ErrorTypes.ValidationError,
        source: error.source,
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
