import {getYear} from 'date-fns';
import * as yup from 'yup';

export const validateSSN = (input, fullSSNRequired = false) => {
    if (fullSSNRequired) {
        return yup
            .string()
            .min(9, 'SSN is invalid')
            .max(9, 'SSN is invalid')
            .required('SSN is required');
    } else {
        return yup
            .string()
            .min(4, 'SSN is invalid')
            .max(4, 'SSN is invalid')
            .required('Last four digits of SSN are required');
    }
};

export const validatePostalCode = () => {
    return yup
        .string()
        .min(5, 'Postal code is invalid')
        .required('Postal code is required');
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
    return yup.string().required('Street address is required');
};

export const validateStreetAddressTwo = (input) => {
    return yup.string();
};

export const validateCity = (input) => {
    return yup.string().required('City is required');
};

export const validateState = (input) => {
    return yup
        .string()
        .max(2, 'State code is invalid')
        .required('State code required');
};

export const validatePhoneNumber = () => {
    return yup.string().required('Phone number required');
};

export const validateDay = (input) => {
    return yup.number().max(31, 'Day invalid').required('Day required');
};

export const validateMonth = (input) => {
    return yup.string().required('Month required');
};

export const validateYear = (input) => {
    return yup.number().min(1900, 'Year invalid').required('Year required');
};

export const validateEmailVerifyCode = () => {
    return yup.string().required('Verification code required');
};
