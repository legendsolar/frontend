export const validateSSN = (input, fullSSNRequired = false) => {
    if (!input) {
        return {
            error: true,
            errMsg: "SSN cannot be left blank",
        };
    }

    if (!input || !input.match(/\d+/g)) {
        return {
            error: true,
            errMsg: `SSN must contain only numbers, no "-" or spaces`,
        };
    }

    if (fullSSNRequired && input.length != 9) {
        return {
            error: true,
            errMsg: "SSN must be all 9 digits",
        };
    } else if (!fullSSNRequired && input.length != 4) {
        return {
            error: true,
            errMsg: "Just the last 4 digits are required",
        };
    }

    return {
        error: false,
        errMsg: undefined,
    };
};

export const validatePostalCode = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: "Zip code required",
        };
    } else if (!input.length || input.length !== 5 || !input.match(/\d+/g)) {
        return {
            error: true,
            errMsg: "Zip code invalid",
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};

export const validatePassword = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: "Password required",
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};
