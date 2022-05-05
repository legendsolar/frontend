import {useNavigate} from 'react-router-dom';
import {useAuth} from './use_auth';
import {useLocation} from 'react-router-dom';
import {authErrorTranslator} from 'utils/auth_error_translator';
import {throwValidationError} from 'utils/errors';

const useSignIn = (auth = null) => {
    const navigate = useNavigate();
    const {state} = useLocation();

    if (!auth) {
        auth = useAuth();
    }

    const onSuccesfulSignIn = () => {
        navigate('/');
    };

    const handleFirebaseError = (error) => {
        const translatedError = authErrorTranslator(error);

        return translatedError;
    };

    const onSignInSubmit = (values) => {
        return auth
            .signin(values.email, values.password)
            .then(() => {
                onSuccesfulSignIn();
            })
            .catch((error) => {
                const translatedError = handleFirebaseError(error);
                throwValidationError(translatedError);
            });
    };

    const onCreateAccountSubmit = (values) => {
        return auth.signup(values.email, values.password).catch((error) => {
            const translatedError = handleFirebaseError(error);
            throwValidationError(translatedError);
        });
    };

    const onCreateNewAccount = () => {
        navigate('/signUp');
    };

    const onSignInWithGoogle = () => {
        return auth
            .signInWithGoogle()
            .then(() => {
                onSuccesfulSignIn();
            })
            .catch((error) => {
                const translatedError = handleFirebaseError(error);
                throwValidationError(translatedError);
            });
    };

    const onSignUpWithEmail = () => {
        navigate('/complete-account');
    };

    const onNavigateToSignIn = () => {
        navigate('/signin');
    };

    const onForgotPassword = (values) => {
        return auth.resetPassword(values.email).catch((error) => {
            const translatedError = handleFirebaseError(error);
            throwValidationError(translatedError);
        });
    };

    const onSignUpWithGoogle = onSignInWithGoogle;

    return {
        onForgotPassword,
        onSignInSubmit,
        onSignInWithGoogle,
        onCreateNewAccount,
        onSignUpWithEmail,
        onNavigateToSignIn,
        onSignUpWithGoogle,
        onCreateAccountSubmit,
        onForgotPassword,
    };
};

export default useSignIn;
