import IdentityVerificationDocument from '../identity_verification_document';

const TestIdentityVerificationDocument = () => {
    return (
        <IdentityVerificationDocument
            onSubmit={() => alert('onSubmit')}
        ></IdentityVerificationDocument>
    );
};

export default TestIdentityVerificationDocument;
