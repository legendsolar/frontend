export const signUpOrder = {
    NO_ACCOUNT: -1,
    ACCOUNT_CREATED: 0,
    ACCEPTANCE_COMPLETE: 1,
    ACCREDATION_VERIF_COMPLETE: 2,
    DWOLLA_ACCOUNT_RETRY_REQ: 3,
    DWOLLA_ACCOUNT_KBA_REQ: 4,
    DWOLLA_ACCOUNT_DOCUMENT_REQ: 5,
    DWOLLA_ACCOUNT_VERIFIED: 6,
};

export const userSignUpOrder = (state) => {
    if (state in signUpOrder) {
        return signUpOrder[state];
    }

    return -1;
};
