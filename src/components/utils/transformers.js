import {format} from 'date-fns';

export const transformFormValuesToUserDwollaAccountData = (values) => {
    const dob = new Date(`${values.month} ${values.day} ${values.year}`);

    return {
        address: transformValuesToUserAddress(values),
        firstName: values.firstName,
        lastName: values.lastName,
        ssn: values.ssn,
        dateOfBirth: format(dob, 'P'),
    };
};

export const transformValuesToUserAddress = (values) => {
    return {
        streetAddress: values.streetAddress,
        streetAddress2: values.streetAddress2,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
    };
};
