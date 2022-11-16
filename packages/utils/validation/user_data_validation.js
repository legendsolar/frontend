import {getYear} from 'date-fns';
import * as yup from 'yup';

export const validateSSN = (fullSSNRequired = false) => {
    if (fullSSNRequired) {
        return yup
            .string()
            .min(9, 'SSN invalid')
            .max(9, 'SSN invalid')
            .matches(/^\d+$/, 'SSN invalid')
            .required('Required');
    } else {
        return yup
            .string()
            .min(4, 'SSN invalid')
            .max(4, 'SSN invalid')
            .matches(/^\d+$/, 'SSN invalid')
            .required('Required');
    }
};

export const validatePostalCode = () => {
    return yup
        .string()
        .matches(/^\d+$/, 'Zip code invalid')
        .min(5, 'Zip code invalid')
        .max(5, 'Zip code invalid')
        .required('Required');
};

export const validatePassword = () => {
    return yup
        .string()
        .min(12, 'Must be a min of 12 characters')
        .matches(/[A-Z]/, 'Must contain 1 uppercase')
        .matches(/[\d#$@!%&*?]/, 'Must contain 1 symbol or digit')
        .required('Password must contain one uppercase, one symbol or digit');
};

export const validateSignInPassword = () => {
    return yup.string().required('Required');
};

export const validateConfirmPassword = (password) => {
    return yup.string().matches(password).required('Password does not match');
};

export const validateEmail = () => {
    return yup.string().email('Email invalid').required('Required');
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
    return yup.string().max(2, 'State code invalid').required('Required');
};

export const validatePhoneNumber = () => {
    return yup
        .string()
        .matches(
            /^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            'Phone number invalid',
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
        .max(getYear(new Date()) - 18, `You must be ${18} or older to register`)
        .required('Required');
};

export const validateMfaVerifyCode = () => {
    return yup.string().required('Required');
};

export const validateAccessPhrase = () => {
    return yup.string().required('Required');
};

export const formatPhoneNumber = (phone) => {
    const formattedNumber = phone.replace(/ /g, '');
    return '+1' + formattedNumber;
};
