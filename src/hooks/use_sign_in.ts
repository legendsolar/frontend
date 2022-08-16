import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './use_auth';
import {useLocation} from 'react-router-dom';
import {authErrorHandler} from 'utils/auth_error_translator';
import {throwValidationError} from 'utils/errors';
import {useUser} from './use_user';
import {ROUTES} from 'routes/routes';
import {boolean} from 'yup';
import {RecaptchaVerifier} from 'firebase/auth';

export enum States {
    SIGN_IN = 'sign_in',
    MFA_VERIFY = 'mfa_verify',
    FORGOT_PASSWORD = 'forgot_password',
}

export interface useSignInReturnType {
    state: States;
    codeSent: boolean;
    setCaptcha(v: RecaptchaVerifier): void;
    setState(s: States): void;
    onForgotPassword({email}: {email: string}): Promise<void>;
    onSignInSubmit({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<void>;
    onSignInWithGoogle(): Promise<void>;
    onCreateNewAccount(): void;
    onSignUpWithEmail(): void;
    onNavigateToSignIn(): void;
    onSignUpWithGoogle(): Promise<void>;
    onSubmitCode({code}: {code: string}): Promise<void>;
}

const useSignIn = (): useSignInReturnType => {
    const navigate = useNavigate();
    const [state, setState] = useState(States.SIGN_IN);
    const [resolver, setResolver] = useState(null);
    const [captcha, setCaptcha] = useState<RecaptchaVerifier>();
    const [verificationId, setVerificationId] = useState(null);
    const [codeSent, setCodeSent] = useState(false);

    const {
        signin,
        signInWithGoogle,
        resetPassword,
        sendMfaVerification,
        validateMfaCode,
    } = useAuth();

    const onSuccesfulSignIn = () => {
        navigate('/');
    };

    const onSignInSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        return signin(email, password)
            .then(() => {
                onSuccesfulSignIn();
            })
            .catch((error) => {
                if (error.code === 'auth/multi-factor-auth-required') {
                    const resolver = error.resolver;
                    setResolver(resolver);
                    return sendMfaVerification(resolver, captcha).then(
                        (verificationId) => {
                            setVerificationId(verificationId);
                            setState(States.MFA_VERIFY);
                            setCodeSent(true);
                        },
                    );
                } else {
                    authErrorHandler(error);
                }
            });
    };

    const onCreateNewAccount = () => {
        navigate(ROUTES.CREATE_ACCOUNT);
    };

    const onSignInWithGoogle = async () => {
        return signInWithGoogle()
            .then(() => {
                onSuccesfulSignIn();
            })
            .catch((error) => authErrorHandler(error));
    };

    const onSignUpWithEmail = () => {
        navigate(ROUTES.CREATE_ACCOUNT);
    };

    const onNavigateToSignIn = () => {
        navigate(ROUTES.SIGN_IN);
    };

    const onForgotPassword = ({email}) => {
        return resetPassword(email).catch((error) => authErrorHandler(error));
    };

    const onSubmitCode = async ({code}) => {
        return validateMfaCode(verificationId, code, resolver).catch((error) =>
            authErrorHandler(error),
        );
    };

    const onSignUpWithGoogle = async () => {
        onSignInWithGoogle().then(() => {});
    };

    return {
        state,
        codeSent,
        setCaptcha,
        setState,
        onForgotPassword,
        onSignInSubmit,
        onSignInWithGoogle,
        onCreateNewAccount,
        onSignUpWithEmail,
        onNavigateToSignIn,
        onSignUpWithGoogle,
        onSubmitCode,
    };
};

export default useSignIn;
