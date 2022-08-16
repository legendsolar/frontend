import SignInComponent from 'components/user/sign_in_component';
import useSignIn, {useSignInReturnType} from 'hooks/use_sign_in';
import ForgotPasswordComponent from 'components/user/forgot_password_component';
import MfaVerifyComponent from 'components/user/mfa_verify_component';
import RecaptchaVerifier from 'components/invisible/recaptcha_verifier';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import BackButton from 'components/buttons/back_button';
import DualPaneView from 'views/dual_pane_view';
import Component from 'components/basics/component';
import {States} from 'hooks/use_sign_in';
import {Typography} from '@mui/material';

interface SignInPageProps extends useSignInReturnType {}

const SignInPage = ({
    state,
    codeSent,
    setState,
    setCaptcha,
    onSubmitCode,
    onSignInWithGoogle,
    onSignInSubmit,
    onCreateNewAccount,
    onForgotPassword,
}: SignInPageProps) => {
    const states = (state: States): JSX.Element => {
        switch (state) {
            case States.SIGN_IN:
                return (
                    <Component background={false}>
                        <SignInComponent
                            onSubmit={onSignInSubmit}
                            onSignInWithGoogle={onSignInWithGoogle}
                            onForgotPassword={() =>
                                setState(States.FORGOT_PASSWORD)
                            }
                            onCreateNewAccount={onCreateNewAccount}
                            color={'light'}
                        ></SignInComponent>

                        {/* Recaptcha must be rendered here for now, 
                        is it is expected to be completed by 
                        the time mfa verification is sent*/}
                        <RecaptchaVerifier
                            captchaComplete={setCaptcha}
                        ></RecaptchaVerifier>
                    </Component>
                );

            case States.MFA_VERIFY:
                return (
                    <Component background={false}>
                        <Typography variant={'smallHeadline' as any}>
                            Verify MFA
                        </Typography>
                        <MfaVerifyComponent
                            color={'light'}
                            onSubmit={onSubmitCode}
                            codeSent={codeSent}
                            initialCodeValues={{}}
                            onChangePhoneRequested={() => {}}
                            changePhoneAllowed={false}
                        ></MfaVerifyComponent>
                    </Component>
                );
            case States.FORGOT_PASSWORD:
                return (
                    <Component background={false}>
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

export default () => <SignInPage {...useSignIn()} />;
