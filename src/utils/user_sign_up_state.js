export const userSignUpOrder = (state) => {
    const signUpOrder = {
        ACCOUNT_CREATED: 0,
        ACCREDATION_VERIF_COMPLETE: 1,
        DWOLLA_ACCOUNT_RETRY_REQ: 2,
        DWOLLA_ACCOUNT_KBA_REQ: 3,
        DWOLLA_ACCOUNT_DOCUMENT_REQ: 4,
        DWOLLA_ACCOUNT_VERIFIED: 5,
    };

    if (state in signUpOrder) {
        return signUpOrder[state];
    }

    return -1;
};