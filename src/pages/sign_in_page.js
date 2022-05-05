import {useState} from 'react';
import CenteredComponentView from 'views/centered_component_view';
import SignInComponent from 'components/user/sign_in_component';
import useSignIn from 'hooks/use_sign_in';
import ForgotPasswordComponent from 'components/user/forgot_password_component';

const SignInPage = () => {
    const {
        onSignInWithGoogle,
        onSignInSubmit,
        onCreateNewAccount,
        onForgotPassword,
    } = useSignIn();

    const [state, setState] = useState('signin');

    return (
        <CenteredComponentView>
            {state === 'signin' && (
                <SignInComponent
                    onSubmit={onSignInSubmit}
                    onSignInWithGoogle={onSignInWithGoogle}
                    onForgotPassword={() => setState('forgotPassword')}
                    onCreateNewAccount={onCreateNewAccount}
                ></SignInComponent>
            )}
            {state === 'forgotPassword' && (
                <ForgotPasswordComponent
                    onSubmit={onForgotPassword}
                    onBackToSignIn={() => setState('signin')}
                ></ForgotPasswordComponent>
            )}
        </CenteredComponentView>
    );
};

export default SignInPage;
