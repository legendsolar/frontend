import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './use_auth';
import {useLocation} from 'react-router-dom';
import {authErrorHandler} from 'utils/auth_error_translator';
import {throwValidationError} from 'utils/errors';
import {useUser} from './use_user';
import {ROUTES} from 'routes/routes';

const useSignIn = () => {
    const navigate = useNavigate();

    const [state, setState] = useState('signin');
    const [resolver, setResolver] = useState(null);
    const [captcha, setCaptcha] = useState(null);
    const [verificationId, setVerificationId] = useState(null);
    const [codeSent, setCodeSent] = useState(false);

    const {useSetUser} = useUser();

    const {
        signin,
        signup,
        signInWithGoogle,
        resetPassword,
        sendMfaVerification,
        validateMfaCode,
    } = useAuth();

    const {useCreateNewUser} = useUser();

    const onSuccesfulSignIn = () => {
        navigate('/');
    };

    const onSignInSubmit = async (values) => {
        return signin(values.email, values.password)
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
                            setState('mfa_verify');
                            setCodeSent(true);
                        },
                    );
                } else {
                    authErrorHandler(error);
                }
            });
    };

    const onCreateAccountSubmit = async (values) => {
        return signup(values.email, values.password).catch((error) =>
            authErrorHandler(error),
        );
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

    const onForgotPassword = (values) => {
        return resetPassword(values.email).catch((error) =>
            authErrorHandler(error),
        );
    };

    const onSubmitCode = async (values) => {
        return validateMfaCode(verificationId, values.code, resolver).catch(
            (error) => authErrorHandler(error),
        );
    };

    const onSignUpWithGoogle = async () => {
        onSignInWithGoogle().then(() => {
            onNewUserCreated();
        });
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
        onCreateAccountSubmit,
        onForgotPassword,
        onSubmitCode,
    };
};

export default useSignIn;
