import {useEffect} from 'react';
import {Typography, Stack, Button} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import {useLocation, useNavigate} from 'react-router-dom';
import AccreditationStatus from 'components/signup/accreditation_status';
import CreateDwollaAccount from 'components/signup/create_dwolla_account';
import LoadingView from 'views/loading_view';
import LinearPageinatedView from 'views/linear_paginated_view';
import {signUpOrder, userSignUpOrder} from 'utils/user_sign_up_state';
import SignUpComponent from 'components/signup/sign_up_component';
import PolicyAcceptanceComponent from 'components/signup/policy_acceptance_component';
import scrollToPosition from 'utils/scroll_to_position';
import {useUser} from 'hooks/use_user';
import useSignIn from 'hooks/use_sign_in';
import {useState} from 'react';
import {format} from 'date-fns';
import CompleteSignUp from 'components/signup/complete_sign_up';
import {userStatus as USER_STATUS} from 'utils/user_sign_up_state';
import EmailVerificationComponent from 'components/signup/email_verification_component';
import MfaCreationComponent from 'components/signup/mfa_creation_component';
import {transformFormValuesToUserDwollaAccountData} from 'components/utils/transformers';
import RecaptchaVerifier from 'components/invisible/recaptcha_verifier';

import {UserDwollaAccountData} from 'schema/schema_gen_types';
import delay from 'utils/delay';
import DualPaneView from 'views/dual_pane_view';

import PanelInfinitySVG from 'assets/images/panel_infinity.svg';
import PanelPersonBlueSVG from 'assets/images/panel_person_blue.svg';
import PanelPersonGreenSVG from 'assets/images/panel_person_green.svg';
import PanelPersonOrangeSVG from 'assets/images/panel_person_orange.svg';
import PanelPersonPinkSVG from 'assets/images/panel_person_pink.svg';
import PanelPersonRedSVG from 'assets/images/panel_person_red.svg';
import PanelPersonYellowSVG from 'assets/images/panel_person_yellow.svg';

import useLinearFlow from 'hooks/use_linear_flow';
import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import CreateAccountContent from 'content/create_account_content';
import AccountCreateInfoContent from 'content/account_create_info_content';
import {ROUTES} from 'routes/app_router';
import {UserStatus} from 'schema/schema_gen_types';
import BackButton from 'components/buttons/back_button';
import SignInPage from './sign_in_page';
import CompleteAccountContent from 'content/complete_account_content';
import VerifyEmailContent from 'content/verify_email_content';
import VerifyMfaContent from 'content/verify_mfa_content';
import VerifyAccreditationContent from 'content/verify_accreditation_content';
import CreateWalletContent from 'content/create_wallet_content';

enum States {
    STEPS_TO_INVEST = 'steps_to_invest',
    EMAIL = 'email',
    PHONE = 'phone',
    ACCREDITATION = 'phone',
    WALLET = 'wallet',
}

const CompleteAccountPage = () => {
    const [state, setState] = useState(States.STEPS_TO_INVEST);

    const navigate = useNavigate();

    const {user} = useAuth();
    const {useGetUserStatus} = useUser();

    const {loading, error, status, refetch} = useGetUserStatus();

    const states = (state: States): JSX.Element => {
        switch (state) {
            case States.STEPS_TO_INVEST:
                return (
                    <CompleteAccountContent
                        stepsTitle={'1/4'}
                        steps={[
                            {
                                complete: false,
                                title: 'Verify Email',
                                icon: (
                                    <Typography variant={'mediumEmoji' as any}>
                                        ✉
                                    </Typography>
                                ),
                                onClick: () => {
                                    setState(States.EMAIL);
                                },
                            },
                            {
                                complete: false,
                                title: 'Verify Phone Number',
                                icon: (
                                    <Typography variant={'mediumEmoji' as any}>
                                        📞
                                    </Typography>
                                ),
                                onClick: () => {
                                    setState(States.PHONE);
                                },
                            },
                            {
                                complete: false,
                                title: 'Verify Accreditation',
                                icon: (
                                    <Typography variant={'mediumEmoji' as any}>
                                        💸
                                    </Typography>
                                ),
                                onClick: () => {
                                    setState(States.ACCREDITATION);
                                },
                            },
                            {
                                complete: false,
                                disabled: true,
                                title: 'Create Wallet',
                                icon: (
                                    <Typography variant={'mediumEmoji' as any}>
                                        🏛
                                    </Typography>
                                ),
                                onClick: () => {
                                    setState(States.WALLET);
                                },
                            },
                        ]}
                    ></CompleteAccountContent>
                );
            case States.EMAIL:
                return (
                    <VerifyEmailContent
                        color="light"
                        email={user?.email}
                        onChangeEmailAddressRequested={(email) => {
                            console.log(email);
                            return delay(1000);
                        }}
                        onSendVerificationEmailAgain={() => {
                            console.log('onSendVerificationEmailAgain');
                            return delay(1000);
                        }}
                    ></VerifyEmailContent>
                );
            case States.PHONE:
                return (
                    <VerifyMfaContent
                        onChangePhoneRequested={(newPhone) => {
                            console.log(newPhone);
                            return delay(1000);
                        }}
                        onMfaCodeSubmit={(code) => {
                            console.log(code);
                            return delay(1000);
                        }}
                    ></VerifyMfaContent>
                );
            case States.ACCREDITATION:
                return (
                    <VerifyAccreditationContent
                        onAccreditationStatusSubmit={(items) => {
                            console.log({items});
                            return delay(1000);
                        }}
                    ></VerifyAccreditationContent>
                );
            case States.WALLET:
                return (
                    <CreateWalletContent
                        onSubmit={(input: UserDwollaAccountData) => {
                            console.log(input);
                            return delay(1000);
                        }}
                        fullSSNRequired={false}
                        color={'light'}
                    ></CreateWalletContent>
                );
        }
    };

    const rightPaneStates = (state: States): JSX.Element => {
        switch (state) {
            case States.STEPS_TO_INVEST:
                return <img src={PanelInfinitySVG}></img>;
            case States.EMAIL:
                return (
                    <img
                        src={PanelPersonGreenSVG}
                        style={{width: '300px'}}
                    ></img>
                );
            case States.PHONE:
                return (
                    <img
                        src={PanelPersonYellowSVG}
                        style={{width: '300px'}}
                    ></img>
                );
            case States.ACCREDITATION:
                return (
                    <img
                        src={PanelPersonPinkSVG}
                        style={{width: '300px'}}
                    ></img>
                );
            case States.WALLET:
                return (
                    <img src={PanelPersonRedSVG} style={{width: '300px'}}></img>
                );
        }
    };

    const rightPaneJustify = (state: States): string => {
        switch (state) {
            case States.STEPS_TO_INVEST:
                return 'flex-end';
            case States.EMAIL:
                return 'center';
            case States.PHONE:
                return 'center';
            case States.ACCREDITATION:
                return 'center';
            case States.WALLET:
                return 'center';
        }
    };

    const upperLeftStates = (state: States): JSX.Element => {
        switch (state) {
            case States.STEPS_TO_INVEST:
                return <></>;
            case States.EMAIL:
                return (
                    <BackButton
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
            case States.PHONE:
                return (
                    <BackButton
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
            case States.ACCREDITATION:
                return (
                    <BackButton
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
            case States.WALLET:
                return (
                    <BackButton
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
        }
    };

    return (
        <DualPaneView
            leftPane={states(state)}
            rightPane={rightPaneStates(state)}
            upperLeftCorner={upperLeftStates(state)}
            options={{
                rightPane: {
                    justifyContent: rightPaneJustify(state),
                },
            }}
        ></DualPaneView>
    );
};

export default CompleteAccountPage;
