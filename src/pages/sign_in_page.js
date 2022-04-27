import CenteredComponentView from 'views/centered_component_view';
import SignInComponent from 'components/user/sign_in_component';
import useSignIn from 'hooks/use_sign_in';

const SignInPage = () => {
    const {
        onForgotPassword,
        onSignInWithGoogle,
        onSignInSubmit,
        onCreateNewAccount,
    } = useSignIn();

    return (
        <CenteredComponentView>
            <SignInComponent
                onSubmit={onSignInSubmit}
                onSignInWithGoogle={onSignInWithGoogle}
                onForgotPassword={onForgotPassword}
                onCreateNewAccount={onCreateNewAccount}
            ></SignInComponent>
        </CenteredComponentView>
    );
};

export default SignInPage;
