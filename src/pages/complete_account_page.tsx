import {useEffect} from 'react';
import {Typography} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import {useNavigate} from 'react-router-dom';
import {useUser} from 'hooks/use_user';
import {useState} from 'react';
import {transformFormValuesToUserDwollaAccountData} from 'components/utils/transformers';
import RecaptchaVerifier from 'components/invisible/recaptcha_verifier';

import {UserDwollaAccountData} from 'schema/schema_gen_types';
import delay from 'utils/delay';
import DualPaneView from 'views/dual_pane_view';

import PanelInfinitySVG from 'assets/images/panel_infinity.svg';
import PanelPersonGreenSVG from 'assets/images/panel_person_green.svg';
import PanelPersonPinkSVG from 'assets/images/panel_person_pink.svg';
import PanelPersonRedSVG from 'assets/images/panel_person_red.svg';
import PanelPersonYellowSVG from 'assets/images/panel_person_yellow.svg';

import {ROUTES} from 'routes/routes';
import CompleteAccountContent from 'content/complete_account_content';
import VerifyEmailContent from 'content/verify_email_content';
import VerifyMfaContent from 'content/verify_mfa_content';
import VerifyAccreditationContent from 'content/verify_accreditation_content';
import CreateWalletContent from 'content/create_wallet_content';
import BackButton from 'components/buttons/back_button';
import LoadingComponent from 'components/basics/loading_component';

enum States {
    STEPS_TO_INVEST = 'steps_to_invest',
    EMAIL = 'email',
    PHONE = 'phone',
    ACCREDITATION = 'accreditation',
    WALLET = 'wallet',
}

const CompleteAccountPage = () => {
    const [state, setState] = useState(States.STEPS_TO_INVEST);

    const navigate = useNavigate();

    const {user, signout, sendEmailVerify, enrollUserMfa, enrollWithMfaCode} =
        useAuth();
    const {
        useGetUserStatus,
        useUserMetaData,
        useUpdateUserAccreditation,
        useCreateDwollaAccount,
    } = useUser();

    const [captcha, setCaptcha] = useState(null);

    const {
        loading: statusLoading,
        error: statusError,
        status,
        refetch: statusRefetch,
    } = useGetUserStatus();

    const {
        loading: userDataLoading,
        error: userDataError,
        firstName,
        lastName,
        streetAddress,
        streetAddress2,
        city,
        postalCode,
        phone,
        refetch: userDataRefetch,
    } = useUserMetaData();

    const {createDwollaAccount, loading: createDwollaAccountLoading} =
        useCreateDwollaAccount();

    const {update: updateAccreditation} = useUpdateUserAccreditation();

    const loading = statusLoading || userDataLoading;

    const stepsComplete = {
        email: status?.emailVerified,
        mfa: status?.mfaVerified,
        accreditation: status?.accreditation?.length > 0,
        wallet: status?.verified,
    };

    useEffect(() => {
        if (!loading && status) {
            if (state === States.EMAIL && !status.emailVerified) {
                sendEmailVerify();
            }
        }
    }, [loading, status, state]);

    useEffect(() => {
        if (state === States.PHONE && captcha && phone && !status.mfaVerified) {
            enrollUserMfa(phone, captcha);
        }
    }, [loading, status, state, captcha]);

    const states = (state: States): JSX.Element => {
        switch (state) {
            case States.STEPS_TO_INVEST:
                return (
                    <CompleteAccountContent
                        onContinue={() => navigate(ROUTES.DISCOVER)}
                        stepsTitle={`${Object.entries(stepsComplete)
                            .reduce(
                                ([n, d], [key, value]) => [
                                    n + (!!value ? 1 : 0),
                                    d + 1,
                                ],
                                [0, 0],
                            )
                            .join('/')}`}
                        steps={[
                            {
                                complete: status.emailVerified,
                                completeMessage: '✅',
                                title: 'Verify Email',
                                icon: (
                                    <Typography variant={'mediumEmoji' as any}>
                                        📧
                                    </Typography>
                                ),
                                onClick: () => {
                                    setState(States.EMAIL);
                                },
                            },
                            {
                                complete: status.mfaVerified,
                                disabled: !stepsComplete.email,
                                disabledMessage: 'Verify email first',
                                completeMessage: '✅',
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
                                complete: status.accreditation?.length > 0,
                                title: 'Verify Accreditation',
                                completeMessage: '✅',
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
                                complete: status.verified,
                                disabled:
                                    !stepsComplete.email ||
                                    !stepsComplete.mfa ||
                                    !stepsComplete.accreditation,
                                disabledMessage: 'Complete others first',
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
                        email={user?.email ? user.email : ''}
                        onChangeEmailAddressRequested={(email) => {
                            console.log(email);
                            return delay(1000);
                        }}
                        onSendVerificationEmailAgain={sendEmailVerify}
                    ></VerifyEmailContent>
                );
            case States.PHONE:
                return (
                    <div>
                        {/** Don't render captcha until MFA verification */}
                        <RecaptchaVerifier
                            captchaComplete={setCaptcha}
                        ></RecaptchaVerifier>
                        <VerifyMfaContent
                            onChangePhoneRequested={(newPhone) => {
                                // if (captcha && newPhone) {
                                //     enrollUserMfa(phone, captcha);
                                // }
                                console.log(newPhone);
                                return delay(1000);
                            }}
                            onMfaCodeSubmit={async (code) => {
                                await enrollWithMfaCode(code);
                                await statusRefetch();
                                setState(States.STEPS_TO_INVEST);
                            }}
                        ></VerifyMfaContent>
                    </div>
                );
            case States.ACCREDITATION:
                return (
                    <VerifyAccreditationContent
                        onAccreditationStatusSubmit={async (accreditation) => {
                            await updateAccreditation(accreditation);
                            setState(States.STEPS_TO_INVEST);
                        }}
                    ></VerifyAccreditationContent>
                );
            case States.WALLET:
                return (
                    <CreateWalletContent
                        onSubmit={async (input: UserDwollaAccountData) => {
                            const variables = {
                                input: {
                                    ...transformFormValuesToUserDwollaAccountData(
                                        input,
                                    ),
                                },
                            };

                            await createDwollaAccount({
                                variables,
                            });

                            await statusRefetch();

                            setState(States.STEPS_TO_INVEST);
                        }}
                        fullSSNRequired={false}
                        color={'light'}
                        initialValues={{
                            firstName,
                            lastName,
                            streetAddress,
                            streetAddress2,
                            postalCode,
                            city,
                        }}
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
                return (
                    <BackButton
                        label={'Sign out'}
                        onClick={() => {
                            signout();
                        }}
                    ></BackButton>
                );
            case States.EMAIL:
                return (
                    <BackButton
                        label={'Back'}
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
            case States.PHONE:
                return (
                    <BackButton
                        label={'Back'}
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
            case States.ACCREDITATION:
                return (
                    <BackButton
                        label={'Back'}
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
            case States.WALLET:
                return (
                    <BackButton
                        label={'Back'}
                        onClick={() => setState(States.STEPS_TO_INVEST)}
                    ></BackButton>
                );
        }
    };

    return (
        <DualPaneView
            leftPane={
                loading ? <LoadingComponent></LoadingComponent> : states(state)
            }
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
