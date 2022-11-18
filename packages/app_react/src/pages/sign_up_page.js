import CenteredComponentView from '@project/components/views/centered_component_view';
import {SignUpOptionComponent} from '@project/components/signup/sign_up_option_component';
import useSignIn from '@project/hooks/use_sign_in';
import {useUser} from '@project/hooks/use_user';

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
