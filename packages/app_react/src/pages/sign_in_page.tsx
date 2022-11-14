import {SignInComponent} from '@project/components/inputs/sign_in_component';
import useSignIn, {useSignInReturnType} from '@project/hooks/use_sign_in';
import {ForgotPasswordComponent} from '@project/components/inputs/forgot_password_component';
import {MfaVerifyComponent} from '@project/components/inputs/mfa_verify_component';
import {RecaptchaVerifier} from '@project/components/invisible/recaptcha_verifier';
import WomanPanelsSVG from '@project/components/assets/images/women_panel.svg';
import {BackButton} from '@project/components/buttons/back_button';
import DualPaneView from '../views/dual_pane_view';
import {Component} from '@project/components/basics/component';
import {States} from '@project/hooks/use_sign_in';
import {Typography} from '@mui/material';

import {EXTERNAL_LINKS, redirectToHomePage} from 'webflow/webflowLinking';

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
                        linkText={'https://legends.solar'}
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
