export const transformFormValuesToUserDwollaAccountData = (values) => {
    const dob = new Date(`${values.month} ${values.day} ${values.year}`);

    return {
        address: {
            streetAddress: values.streetAddress,
            streetAddress2: values.streetAddress2,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
        },
        firstName: values.firstName,
        lastName: values.lastName,
        ssn: values.ssn,
        dateOfBirth: format(dob, 'P'),
    };
};
