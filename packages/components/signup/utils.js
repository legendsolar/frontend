export const transformUserDataToDwollaObject = (userInfo) => {
    const dwollaObject = {
        name: {
            first: userInfo.firstName.value,
            last: userInfo.lastName.value,
        },
        address: {
            streetAddress: userInfo.streetAddress.value,
            streetAddress2: userInfo.streetAddress2.value,
            city: userInfo.city.value,
            state: userInfo.state.value,
            postalCode: userInfo.postalCode.value,
        },
        dateOfBirth: userInfo?.dateOfBirth?.value,
        ssn: userInfo?.ssn?.value,
    };

    return dwollaObject;
};
