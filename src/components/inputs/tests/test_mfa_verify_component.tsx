import MfaVerifyComponent from '../mfa_verify_component';

export default () => {
    return (
        <MfaVerifyComponent
            onSubmit={async (values) => console.log({onSubmit: {values}})}
            codeSent={false}
            onChangePhoneRequested={() =>
                console.log({onChangePhoneReqested: {}})
            }
        ></MfaVerifyComponent>
    );
};
