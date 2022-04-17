import SignUpOptionComponent from '../sign_up_option_component';

const TestSignUpOptionComponent = () => {
    return (
        <SignUpOptionComponent
            onSignUpWithGoogle={() => alert('onSignUpWithGoogle')}
            onSignUpWithEmail={() => alert('onSignUpWithEmail')}
            onNavigateToSignIn={() => alert('onNavigateToSignIn')}
        ></SignUpOptionComponent>
    );
};

export default TestSignUpOptionComponent;
