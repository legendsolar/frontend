import ForgotPasswordComponent from '../forgot_password_component';

const TestModifyUserInfo = () => {
    return (
        <ForgotPasswordComponent
            onSubmit={async (values) => console.log({onsubmit: {values}})}
            onBackToSignIn={() => console.log({onBackToSignIn: {}})}
        ></ForgotPasswordComponent>
    );
};

export default TestModifyUserInfo;
