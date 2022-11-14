import SignUpOptionComponent from '../sign_up_option_component';

export const TestSignUpOptionComponent = () => {
    return (
        <SignUpOptionComponent
            onSignUpWithGoogle={() => alert('onSignUpWithGoogle')}
            onSignUpWithEmail={() => alert('onSignUpWithEmail')}
            onNavigateToSignIn={() => alert('onNavigateToSignIn')}
        ></SignUpOptionComponent>
    );
};
