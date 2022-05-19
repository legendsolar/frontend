import {useNavigate} from 'react-router-dom';
import {useAuth} from './use_auth';
import {useLocation} from 'react-router-dom';
import {authErrorHandler} from 'utils/auth_error_translator';
import {throwValidationError} from 'utils/errors';
import {useUser} from './use_user';

const useSignIn = (auth = null) => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {useSetUser} = useUser();

    if (!auth) {
        auth = useAuth();
    }

    const onSuccesfulSignIn = () => {
        navigate('/');
    };

    const onSignInSubmit = (values) => {
        return auth
            .signin(values.email, values.password)
            .then(() => {
                onSuccesfulSignIn();
            })
            .catch((error) => authErrorHandler(error));
    };

    const onCreateAccountSubmit = (values) => {
        return auth
            .signup(values.email, values.password)
            .catch((error) => authErrorHandler(error))
            .then(() => {
                console.log('then ran');
                // update user data with values

                useSetUser({
                    variables: {
                        input: {},
                    },
                });
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
            .catch((error) => authErrorHandler(error));
    };

    const onSignUpWithEmail = () => {
        navigate('/complete-account');
    };

    const onNavigateToSignIn = () => {
        navigate('/signin');
    };

    const onForgotPassword = (values) => {
        return auth
            .resetPassword(values.email)
            .catch((error) => authErrorHandler(error));
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
