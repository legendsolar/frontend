import {useState} from 'react';
import {useAuth} from 'hooks/use_auth';
import {useNavigate} from 'react-router-dom';
import CenteredComponentView from 'views/centered_component_view';
import {authErrorTranslator} from 'utils/auth_error_translator';
import SignUpOptionComponent from 'components/signup/sign_up_option_component';

export default function SignUpView() {
    const authHook = useAuth();
    const navigate = useNavigate();

    const onSuccessfulSignUp = () => {
        navigate('/complete-account/create');
    };

    const handleFirebaseError = (error) => {
        const translatedError = authErrorTranslator(error);
    };

    const signUpWithGoogle = () => {
        authHook
            .signInWithGoogle()
            .then(() => {
                onSuccessfulSignUp();
            })
            .catch((error) => {
                handleFirebaseError(error);
            });
    };

    const signUpWithEmail = () => {
        navigate('/complete-account/create');
    };

    const navigateToSignIn = () => {
        navigate('/signin');
    };

    return (
        <CenteredComponentView>
            <SignUpOptionComponent
                onSignUpWithGoogle={signUpWithGoogle}
                onSignUpWithEmail={signUpWithEmail}
                onNavigateToSignIn={navigateToSignIn}
            ></SignUpOptionComponent>
        </CenteredComponentView>
    );
}
