import {getYear} from 'date-fns';
import * as yup from 'yup';
import settings from 'app_settings';

export const validateSSN = (fullSSNRequired = false) => {
    if (fullSSNRequired) {
        return yup
            .string()
            .min(9, 'SSN is invalid')
            .max(9, 'SSN is invalid')
            .matches(/^\d+$/, 'SSN is invalid')
            .required('Required');
    } else {
        return yup
            .string()
            .min(4, 'SSN is invalid')
            .max(4, 'SSN is invalid')
            .matches(/^\d+$/, 'SSN is invalid')
            .required('Required');
    }
};

export const validatePostalCode = () => {
    return yup
        .string()
        .matches(/^\d+$/, 'Zip code invalid')
        .min(5, 'Zip code invalid')
        .required('Required');
};

export const validatePassword = (input) => {
    return yup
        .string()
        .min(12, 'Password must be a min of 12 characters')
        .matches(
            /(?=.*[\d\W])(?=.*[a-zA-Z])/,
            'Password must contain one letter and one symbol or digit',
        )
        .required('Required');
};

export const validateEmail = () => {
    return yup.string().email('Email is invalid').required('Required');
};

export const validateFirstName = () => {
    return yup.string().required('Required');
};

export const validateLastName = () => {
    return yup.string().required('Required');
};

export const validateStreetAddress = () => {
    return yup.string().required('Required');
};

export const validateStreetAddressTwo = () => {
    return yup.string();
};

export const validateCity = () => {
    return yup.string().required('Required');
};

export const validateState = () => {
    return yup.string().max(2, 'State code is invalid').required('Required');
};

export const validatePhoneNumber = () => {
    return yup
        .string()
        .matches(
            /^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            'Phone number is invalid',
        )
        .required('Required');
};

export const validateDay = () => {
    return yup
        .number()
        .min(1, 'Day invalid')
        .max(31, 'Day invalid')
        .required('Required');
};

export const validateMonth = () => {
    return yup.string().required('Required');
};

export const validateYear = () => {
    return yup
        .number()
        .min(1900, 'Year invalid')
        .max(
            getYear(new Date()) - settings.minPlatformAge,
            `You must be ${settings.minPlatformAge} or older to register`,
        )
        .required('Required');
};

export const validateMfaVerifyCode = () => {
    return yup.string().required('Required');
};

export const validateAccessPhrase = () => {
    return yup.string().required('Required');
};
