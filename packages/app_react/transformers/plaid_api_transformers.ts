import {
    AccountType,
    CreateAccountInput,
    PlaidAccountStatus,
} from 'schema/schema_gen_types';

export const transformPlaidVerificationStatus = (
    status: String | undefined,
): PlaidAccountStatus => {
    if (!status) {
        return PlaidAccountStatus.Verified;
    }

    switch (status) {
        case 'pending_manual_verification':
            return PlaidAccountStatus.PendingVerification;
        case 'manually_verified':
            return PlaidAccountStatus.Verified;
        case 'verification_failed':
            return PlaidAccountStatus.Failed;
        default:
            throw new Error(
                `Cannot transform plaid status of ${status} to schema any status`,
            );
    }
};

export const transformPlaidDataToCreateAccountInput = (
    publicToken: string,
    metadata: any,
): CreateAccountInput => {
    const account = metadata.account;

    console.log({publicToken, metadata});

    const institution = metadata?.institution?.name
        ? metadata.institution.name
        : 'Unknown';

    const input: CreateAccountInput = {
        publicToken: publicToken,
        plaidId: account.id,
        institution: institution,
        plaidStatus: transformPlaidVerificationStatus(
            account.verification_status,
        ),
        name: account.name,
        type: account.subtype.toUpperCase(),
        mask: account.mask,
    };

    return input;
};

export const transformPlaidAccountType = (
    type: String | undefined,
): AccountType => {
    switch (type) {
        case 'savings':
            return AccountType.Savings;
        case 'checking':
            return AccountType.Checking;
        default:
            throw new Error(
                `Cannot transform plaid type of ${type} to schema any status`,
            );
    }
};
