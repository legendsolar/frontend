import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './use_auth';
import {useLocation} from 'react-router-dom';
import {authErrorHandler} from 'utils/auth_error_translator';
import {
    throwInternalStateError,
    throwSystemError,
    throwValidationError,
} from '@p/utils/errors';
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
    const [verificationId, setVerificationId] = useState<string | undefined>(
        undefined,
    );
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
        try {
            await signin(email, password);
            onSuccesfulSignIn();
        } catch (error: any) {
            if (error.code === 'auth/multi-factor-auth-required') {
                const resolver = error.resolver;
                setResolver(resolver);
                if (!captcha) {
                    throwSystemError({
                        message:
                            'cannot complete sign in with mfa: captcha not complete or invalid',
                    });
                    return;
                }

                const verificationId = await sendMfaVerification(
                    resolver,
                    captcha,
                );
                setVerificationId(verificationId);
                setState(States.MFA_VERIFY);
                setCodeSent(true);
            } else {
                authErrorHandler(error);
            }
        }
    };

    const onCreateNewAccount = () => {
        navigate(ROUTES.CREATE_ACCOUNT);
    };

    const onSignInWithGoogle = async () => {
        return signInWithGoogle().then(() => {
            onSuccesfulSignIn();
        });
    };

    const onSignUpWithEmail = () => {
        navigate(ROUTES.CREATE_ACCOUNT);
    };

    const onNavigateToSignIn = () => {
        navigate(ROUTES.SIGN_IN);
    };

    const onForgotPassword = ({email}) => {
        return resetPassword(email);
    };

    const onSubmitCode = async ({code}) => {
        if (!verificationId) {
            throwInternalStateError({
                message:
                    'mfa code submission failed: verification id not set on code set',
            });
            return;
        }

        if (!resolver) {
            throwInternalStateError({
                message: 'mfa code submission failed: resolver not set',
            });
            return;
        }

        return await validateMfaCode(verificationId, code, resolver);
    };

    const onSignUpWithGoogle = async () => {
        onSignInWithGoogle();
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
