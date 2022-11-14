import {useEffect} from 'react';
import {Typography} from '@mui/material';
import {useAuth} from '@project/hooks/use_auth';
import {useNavigate} from 'react-router-dom';
import {useUser} from '@project/hooks/use_user';
import {useState} from 'react';
import {Component} from '@project/components/basics/component';
import delay from 'utils/delay';
import DualPaneView from 'views/dual_pane_view';

import PanelInfinitySVG from 'assets/images/panel_infinity.svg';
import PanelPersonGreenSVG from 'assets/images/panel_person_green.svg';
import PanelPersonBlueSVG from 'assets/images/panel_person_blue.svg';
import PanelPersonPinkSVG from 'assets/images/panel_person_pink.svg';
import PanelPersonRedSVG from 'assets/images/panel_person_red.svg';
import PanelPersonYellowSVG from 'assets/images/panel_person_yellow.svg';

import {ROUTES} from 'routes/routes';
import CompleteAccountContent from 'content/complete_account_content';
import VerifyEmailContent from 'content/verify_email_content';
import VerifyMfaContent from 'content/verify_mfa_content';
import VerifyAccreditationContent from 'content/verify_accreditation_content';
import CreateWalletContent, {
    transformFormValuesToUserDwollaAccountData,
} from 'content/create_wallet_content';
import {BackButton} from '@project/components/buttons/back_button';
import {LoadingComponent} from '@project/components/basics/loading_component';
import {RecaptchaVerifier as FirebaseRecaptchaVerifier} from 'firebase/auth';
import {
    BankIcon,
    CashIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserDataIcon,
} from '../icons/emoji_icons';

import {CheckIcon} from '../icons/icons';
import UserInformationContent from 'content/user_information_content';
import {sign} from 'crypto';

enum States {
    STEPS_TO_INVEST = 'steps_to_invest',
    PASSWORD_RESET_REQ = 'password_reset_req',
    INFORMATION = 'information',
    EMAIL = 'email',
    PHONE = 'phone',
    ACCREDITATION = 'accreditation',
    WALLET = 'wallet',
}

const CompleteAccountPage = () => {
    const [state, setState] = useState(States.STEPS_TO_INVEST);
    const [mfaCodeSent, setMfaCodeSent] = useState(false);

    const navigate = useNavigate();

    const {
        user,
        signout,
        sendEmailVerify,
        enrollUserMfa,
        updateUserPassword,
        completeMfaEnrollment: enrollWithMfaCode,
    } = useAuth();

    const {
        useGetUserStatus,
        useUserMetaData,
        useUpdateUserAccreditation,
        useCreateDwollaAccount,
        useSetUser,
    } = useUser();

    const [captcha, setCaptcha] = useState<FirebaseRecaptchaVerifier>();

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
    } = useUserMetaData();

    const {
        loading: mutatePhoneLoading,
        error: mutatePhoneError,
        setUser,
    } = useSetUser();

    const {
        createDwollaAccount,
        loading: createDwollaAccountLoading,
        error: createDwollaAccountError,
    } = useCreateDwollaAccount();

    const {update: updateAccreditation, loading: accreditationUpdateLoading} =
        useUpdateUserAccreditation();

    const loading = statusLoading || userDataLoading;

    const stepsComplete = {
        information: firstName && lastName && phone,
        email: status?.emailVerified,
        mfa: status?.mfaVerified,
        accreditation: status?.accreditation
            ? status.accreditation.length > 0
            : false,
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
            setMfaCodeSent(true);
        }
    }, [loading, status, state, captcha, phone]);

    const [subUserInfoLoading, setSubUserInfoLoading] = useState(false);

    const onSubmitUserInformation = async ({
        firstName,
        lastName,
        phone,
        password,
    }) => {
        setSubUserInfoLoading(true);
        await setUser({firstName, lastName, phone});
        await updateUserPassword(password);

        await signout();

        setSubUserInfoLoading(false);

        navigate(ROUTES.SIGN_IN);
    };

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
                                completeMessage: <CheckIcon />,
                                title: 'Verify Email',
                                icon: <EnvelopeIcon></EnvelopeIcon>,
                                onClick: () => {
                                    setState(States.EMAIL);
                                },
                            },
                            {
                                complete: stepsComplete.information,
                                completeMessage: <CheckIcon />,
                                title: 'Complete Information',
                                icon: <UserDataIcon />,
                                onClick: () => {
                                    setState(States.INFORMATION);
                                },
                            },
                            {
                                complete: status.mfaVerified,
                                disabled:
                                    !stepsComplete.email ||
                                    !stepsComplete.information,
                                disabledMessage:
                                    'Verify email and information first',
                                completeMessage: <CheckIcon />,
                                title: 'Verify Phone Number',

                                icon: <PhoneIcon></PhoneIcon>,
                                onClick: () => {
                                    setState(States.PHONE);
                                },
                            },
                            {
                                complete: stepsComplete.accreditation,
                                title: 'Verify Accreditation',
                                completeMessage: <CheckIcon />,
                                icon: <CashIcon></CashIcon>,
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
                                completeMessage: <CheckIcon />,
                                title: 'Create Wallet',
                                icon: <BankIcon></BankIcon>,
                                onClick: () => {
                                    setState(States.WALLET);
                                },
                            },
                        ]}
                    ></CompleteAccountContent>
                );
            case States.PASSWORD_RESET_REQ:
                return (
                    <Component sx={{background: 'none'}}>
                        <UserInformationContent
                            color="light"
                            onSubmit={onSubmitUserInformation}
                            loading={false}
                            error={undefined}
                        ></UserInformationContent>
                    </Component>
                );

            case States.INFORMATION:
                return (
                    <Component sx={{background: 'none'}}>
                        <UserInformationContent
                            color="light"
                            onSubmit={onSubmitUserInformation}
                            loading={subUserInfoLoading}
                            error={undefined}
                        ></UserInformationContent>
                    </Component>
                );
            case States.EMAIL:
                return (
                    <VerifyEmailContent
                        color="light"
                        email={user?.email ? user.email : ''}
                        onChangeEmailAddressRequested={(email) => {
                            return delay(1000);
                        }}
                        onSendVerificationEmailAgain={sendEmailVerify}
                    ></VerifyEmailContent>
                );
            case States.PHONE:
                return (
                    <div>
                        {/** Don't render captcha until MFA verification */}
                        <VerifyMfaContent
                            captchaComplete={setCaptcha}
                            onChangePhoneRequested={async (phone) => {
                                // Mutate user data to new phone
                                // This should change the phone field
                                // and re run enrollUserMfa when it completes
                                setUser({
                                    phone,
                                });
                            }}
                            onMfaCodeSubmit={async (code) => {
                                await enrollWithMfaCode(code);
                                statusRefetch();
                                setState(States.STEPS_TO_INVEST);
                            }}
                            mfaCodeSent={mfaCodeSent}
                        ></VerifyMfaContent>
                    </div>
                );
            case States.ACCREDITATION:
                return (
                    <VerifyAccreditationContent
                        onAccreditationStatusSubmit={async (accreditation) => {
                            updateAccreditation(accreditation);
                            setState(States.STEPS_TO_INVEST);
                        }}
                        loading={accreditationUpdateLoading}
                    ></VerifyAccreditationContent>
                );
            case States.WALLET:
                return (
                    <CreateWalletContent
                        onSubmit={async (input) => {
                            await createDwollaAccount({
                                firstName,
                                lastName,
                                ...transformFormValuesToUserDwollaAccountData(
                                    input,
                                ),
                            });

                            statusRefetch();

                            setState(States.STEPS_TO_INVEST);
                        }}
                        fullSSNRequired={false}
                        color={'light'}
                        loading={createDwollaAccountLoading}
                        error={
                            createDwollaAccountError
                                ? 'Cannot create account, contact support at support@legends.solar'
                                : undefined
                        }
                    ></CreateWalletContent>
                );
        }
    };

    const rightPaneStates = (state: States): JSX.Element => {
        switch (state) {
            case States.STEPS_TO_INVEST:
                return <img src={PanelInfinitySVG}></img>;
            case States.PASSWORD_RESET_REQ:
                return (
                    <img
                        src={PanelPersonBlueSVG}
                        style={{width: '300px'}}
                    ></img>
                );
            case States.INFORMATION:
                return (
                    <img
                        src={PanelPersonBlueSVG}
                        style={{width: '300px'}}
                    ></img>
                );
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
            default:
                return 'center';
        }
    };

    const upperLeftStates = (state: States): JSX.Element => {
        switch (state) {
            case States.STEPS_TO_INVEST:
                if (stepsComplete.information)
                    return (
                        <BackButton
                            label={'Sign out'}
                            onClick={() => {
                                signout();
                            }}
                        ></BackButton>
                    );
                else
                    return (
                        <BackButton
                            label="Back to Homepage"
                            linkText={'https://legends.solar'}
                        ></BackButton>
                    );

            default:
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
