import IdentityVerificationDocument from '../identity_verification_document';

export const TestIdentityVerificationDocument = () => {
    return (
        <IdentityVerificationDocument
            onSubmit={() => alert('onSubmit')}
        ></IdentityVerificationDocument>
    );
};
