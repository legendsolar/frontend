import CenteredComponentView from 'views/centered_component_view';
import SignInComponent from 'components/user/sign_in_component';
import useSignIn from 'hooks/use_sign_in';
import ForgotPasswordComponent from 'components/user/forgot_password_component';
import MfaVerifyComponent from 'components/user/mfa_verify_component';
import {ErrorTypes} from 'utils/errors';
import RecaptchaVerifier from 'components/invisible/recaptcha_verifier';

const SignInPage = () => {
    const {
        state,
        codeSent,
        setState,
        setCaptcha,
        onSubmitCode,
        onSignInWithGoogle,
        onSignInSubmit,
        onCreateNewAccount,
        onForgotPassword,
    } = useSignIn();

    return (
        <CenteredComponentView>
            {state === 'signin' && (
                <div>
                    <SignInComponent
                        onSubmit={onSignInSubmit}
                        onSignInWithGoogle={onSignInWithGoogle}
                        onForgotPassword={() => setState('forgotPassword')}
                        onCreateNewAccount={onCreateNewAccount}
                    ></SignInComponent>

                    <RecaptchaVerifier
                        captchaComplete={setCaptcha}
                    ></RecaptchaVerifier>
                </div>
            )}
            {state === 'mfa_verify' && (
                <div>
                    <MfaVerifyComponent
                        onSubmit={onSubmitCode}
                        codeSent={codeSent}
                    ></MfaVerifyComponent>
                </div>
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
