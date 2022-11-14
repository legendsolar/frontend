export const transformPhoneNumber = (phoneNumber) => {
    const transformed = phoneNumber.replace(/\D/g, '');
    return '+1' + transformed;
};
