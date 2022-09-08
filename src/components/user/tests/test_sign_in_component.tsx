import SignInComponent from '../sign_in_component';

const TestSignInComponent = () => {
    return (
        <SignInComponent
            onSubmit={async ({email, password}) =>
                console.log({onSubmit: {email, password}})
            }
            onForgotPassword={() => console.log({onForgotPassword: {}})}
            onCreateNewAccount={() => console.log({onCreateNewAccount: {}})}
            color="dark"
        ></SignInComponent>
    );
};

export default TestSignInComponent;
