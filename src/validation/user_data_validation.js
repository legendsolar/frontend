import {getYear} from 'date-fns';
import * as yup from 'yup';

export const validateSSN = (input, fullSSNRequired = false) => {
    if (!input) {
        return {
            error: true,
            errMsg: 'SSN cannot be left blank',
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
            errMsg: 'SSN must be all 9 digits',
        };
    } else if (!fullSSNRequired && input.length != 4) {
        return {
            error: true,
            errMsg: 'The last 4 digits are required',
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
            errMsg: 'Zip code required',
        };
    } else if (!input.length || input.length !== 5 || !input.match(/\d+/g)) {
        return {
            error: true,
            errMsg: 'Zip code invalid',
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};

export const validatePassword = (input) => {
    return yup
        .string()
        .min(8, 'Password is a min of 8 characters')
        .required('Password is required');
};

export const validateEmail = () => {
    return yup.string().email('Email is invalid').required('Enter an email');
};

export const validateFirstName = () => {
    return yup.string().required('First name is required');
};

export const validateLastName = () => {
    return yup.string().required('Last name is required');
};

export const validateStreetAddress = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: 'Street address required',
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};

export const validateStreetAddressTwo = (input) => {
    // if (!input) {
    //     return {
    //         error: true,
    //         errMsg: "Last name required",
    //     };
    // } else {
    return {
        error: false,
        errMsg: undefined,
    };
    // }
};

export const validateCity = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: 'City required',
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};

export const validateState = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: 'State required',
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};

export const validatePhoneNumber = () => {
    return yup.string().required('Phone number required');
};

export const validateDay = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: 'Day required',
        };
    } else if (parseInt(input) > 31) {
        return {
            error: true,
            errMsg: 'Day invalid',
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};

export const validateMonth = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: 'Month required',
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};

export const validateYear = (input) => {
    if (!input) {
        return {
            error: true,
            errMsg: 'Year required',
        };
    } else if (parseInt(input) > getYear(new Date()) - 17) {
        return {
            error: true,
            errMsg: 'You must be 18 or older to register on legends',
        };
    } else if (parseInt(input) < getYear(new Date()) - 130) {
        return {
            error: true,
            errMsg: 'Year invalid',
        };
    } else {
        return {
            error: false,
            errMsg: undefined,
        };
    }
};
