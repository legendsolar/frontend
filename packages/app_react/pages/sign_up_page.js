import CenteredComponentView from 'views/centered_component_view';
import SignUpOptionComponent from '../signup/sign_up_option_component';
import useSignIn from 'hooks/use_sign_in';
import {useUser} from 'hooks/use_user';

const SignUpView = () => {
    const {onSignUpWithEmail, onSignUpWithGoogle, onNavigateToSignIn} =
        useSignIn();

    return (
        <CenteredComponentView>
            <SignUpOptionComponent
                onSignUpWithGoogle={onSignUpWithGoogle}
                onSignUpWithEmail={onSignUpWithEmail}
                onNavigateToSignIn={onNavigateToSignIn}
            ></SignUpOptionComponent>
        </CenteredComponentView>
    );
};

export default SignUpView;
