import SignInComponent from '../sign_in_component';

const TestSignInComponent = () => {
    return (
        <SignInComponent
            onSubmit={() => alert('onSubmit')}
            onSignInWithGoogle={() => alert('onSignInWithGoogle')}
            onForgotPassword={() => alert('onForgotPassword')}
            onCreateNewAccount={() => alert('onCreateNewAccount')}
        ></SignInComponent>
    );
};

export default TestSignInComponent;
