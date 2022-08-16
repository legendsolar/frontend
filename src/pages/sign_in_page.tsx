import CenteredComponentView from 'views/centered_component_view';
import SignInComponent from 'components/user/sign_in_component';
import useSignIn from 'hooks/use_sign_in';
import ForgotPasswordComponent from 'components/user/forgot_password_component';
import MfaVerifyComponent from 'components/user/mfa_verify_component';
import {ErrorTypes} from 'utils/errors';
import RecaptchaVerifier from 'components/invisible/recaptcha_verifier';
import {useState} from 'react';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import PanelInfinitySVG from 'assets/images/panel_infinity.svg';
import BackButton from 'components/buttons/back_button';
import DualPaneView from 'views/dual_pane_view';
import Component from 'components/basics/component';
import {States} from 'hooks/use_sign_in';

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

    const states = (state: States): JSX.Element => {
        switch (state) {
            case States.SIGN_IN:
                return (
                    <Component>
                        <SignInComponent
                            onSubmit={onSignInSubmit}
                            onSignInWithGoogle={onSignInWithGoogle}
                            onForgotPassword={() =>
                                setState(States.FORGOT_PASSWORD)
                            }
                            onCreateNewAccount={onCreateNewAccount}
                            color={'light'}
                        ></SignInComponent>

                        <RecaptchaVerifier
                            captchaComplete={setCaptcha}
                        ></RecaptchaVerifier>
                    </Component>
                );

            case States.MFA_VERIFY:
                return (
                    <div>
                        <MfaVerifyComponent
                            color={'light'}
                            onSubmit={onSubmitCode}
                            codeSent={codeSent}
                            initialCodeValues={{}}
                            onChangePhoneRequested={() => {}}
                            changePhoneAllowed={false}
                        ></MfaVerifyComponent>
                    </div>
                );
            case States.FORGOT_PASSWORD:
                return (
                    <Component>
                        <ForgotPasswordComponent
                            onSubmit={onForgotPassword}
                            onBackToSignIn={() => setState(States.SIGN_IN)}
                            color={'light'}
                        ></ForgotPasswordComponent>
                    </Component>
                );
        }
    };

    const rightPaneStates = (state: States): JSX.Element => {
        switch (state) {
            case States.SIGN_IN:
                return <img src={WomanPanelsSVG} width="375px"></img>;

            case States.MFA_VERIFY:
                return <img src={WomanPanelsSVG} width="375px"></img>;

            case States.FORGOT_PASSWORD:
                return <img src={WomanPanelsSVG} width="375px"></img>;
        }
    };

    const upperLeftStates = (state: States): JSX.Element => {
        switch (state) {
            case States.SIGN_IN:
                return (
                    <BackButton
                        label="Back to Homepage"
                        onClick={() => {}}
                    ></BackButton>
                );

            case States.MFA_VERIFY:
                return <></>;

            case States.FORGOT_PASSWORD:
                return <></>;
        }
    };

    return (
        <DualPaneView
            leftPane={states(state)}
            rightPane={rightPaneStates(state)}
            upperLeftCorner={upperLeftStates(state)}
            options={{
                rightPane: {
                    justifyContent: 'center',
                },
            }}
        ></DualPaneView>
    );
};

export default SignInPage;
