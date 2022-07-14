import {getYear} from 'date-fns';
import * as yup from 'yup';
import settings from 'app_settings';

export const validateSSN = (fullSSNRequired = false) => {
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
        .min(12, 'Password must be a min of 12 characters')
        .matches(
            /(?=.*[\d\W])(?=.*[a-zA-Z])/,
            'Password must contain one letter and one symbol or digit',
        )
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

export const validateStreetAddress = () => {
    return yup.string().required('Street address is required');
};

export const validateStreetAddressTwo = () => {
    return yup.string();
};

export const validateCity = () => {
    return yup.string().required('City is required');
};

export const validateState = () => {
    return yup
        .string()
        .max(2, 'State code is invalid')
        .required('State code required');
};

export const validatePhoneNumber = () => {
    return yup
        .string()
        .matches(
            /^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            'Phone number is invalid',
        )
        .required('Phone number required');
};

export const validateDay = () => {
    return yup
        .number()
        .min(1, 'Day invalid')
        .max(31, 'Day invalid')
        .required('Day required');
};

export const validateMonth = () => {
    return yup.string().required('Month required');
};

export const validateYear = () => {
    return yup
        .number()
        .min(1900, 'Year invalid')
        .max(
            getYear(new Date()) - settings.minPlatformAge,
            `You must be ${settings.minPlatformAge} or older to register`,
        )
        .required('Year required');
};

export const validateMfaVerifyCode = () => {
    return yup.string().required('Verification code required');
};

export const validateAccessPhrase = () => {
    return yup.string().required('Access phrase required');
};
