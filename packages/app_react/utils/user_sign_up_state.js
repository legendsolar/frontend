// must match schema
export const userStatus = {
    CREATED: 'CREATED',
    EMAIL_VERIFIED: 'EMAIL_VERIFIED',
    MFA_VERIFIED: 'MFA_VERIFIED',
    ACCEPTANCE_COMPLETE: 'ACCEPTANCE_COMPLETE',
    ACCREDITATION_VERIFIED: 'ACCREDITATION_VERIFIED',
    DWOLLA_ACCOUNT_RETRY_REQ: 'DWOLLA_ACCOUNT_RETRY_REQ',
    DWOLLA_ACCOUNT_KBA_REQ: 'DWOLLA_ACCOUNT_KBA_REQ',
    DWOLLA_ACCOUNT_DOCUMENT_REQ: 'DWOLLA_ACCOUNT_DOCUMENT_REQ',
    IDENTITY_VERIFIED: 'IDENTITY_VERIFIED',
};

export const signUpOrder = {
    NO_ACCOUNT: -1,
    [userStatus.CREATED]: 0,
    [userStatus.ACCEPTANCE_COMPLETE]: 1,
    [userStatus.ACCREDITATION_VERIFIED]: 2,
    [userStatus.DWOLLA_ACCOUNT_RETRY_REQ]: 3,
    [userStatus.DWOLLA_ACCOUNT_KBA_REQ]: 4,
    [userStatus.DWOLLA_ACCOUNT_DOCUMENT_REQ]: 5,
    [userStatus.IDENTITY_VERIFIED]: 6,
};

export const userSignUpOrder = (state) => {
    if (state in signUpOrder) {
        return signUpOrder[state];
    }

    return -2;
};
