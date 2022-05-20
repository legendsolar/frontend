import {useEffect} from 'react';
import {Typography, Stack, Button} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import {useNavigate} from 'react-router-dom';
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

import IdentityVerificationDocument from 'components/signup/identity_verification_document';
import IdentityVerificationKBA from 'components/signup/identity_verification_kba';

const CompleteAccountPage = () => {
    const navigate = useNavigate();
    const {
        sendEmailVerify,
        enrollUserMfa,
        enrollWithMfaCode,
        user,
        isAuthenticating,
    } = useAuth();

    const onComplete = (values) => {
        //shouldn't be needed
        console.log('on complete');
    };

    const {useGetUserStatus, useSetUser, useCreateDwollaAccount} = useUser();

    const {
        loading,
        error,
        status,
        refetch: forceRefreshUserStatus,
    } = useGetUserStatus();
    const [setUser] = useSetUser();
    const {createDwollaAccount, loading: createDwollaAccountLoading} =
        useCreateDwollaAccount();

    const {onCreateAccountSubmit} = useSignIn();

    const [pageIndex, setPageIndex] = useState(0);
    const [captcha, setCaptcha] = useState(null);

    const userSignUpStatus = status;

    const userStatePageIndexMap = (status) => {
        if (!user) {
            return 0;
        }

        if (user && (!status || status === 'CREATED')) {
            return 1;
        }

        const map = {
            NO_ACCOUNT: 0,
            ACCOUNT_CREATED: 1,
            EMAIL_VERIFIED: 2,
            MFA_VERIFIED: 3,
            ACCEPTANCE_COMPLETE: 4,
            // Keep user in complete account flow for retry state
            ACCREDITATION_VERIFIED: 5,
            DWOLLA_ACCOUNT_RETRY_REQ: 5,
            DWOLLA_ACCOUNT_KBA_REQ: 6,
            DWOLLA_ACCOUNT_DOCUMENT_REQ: 7,
            IDENTITY_VERIFIED: 8,

            NOT_ACCREDITED: 10,
        };

        return map[status];
    };

    useEffect(() => {
        const newPage = userStatePageIndexMap(userSignUpStatus);
        setPageIndex(newPage);
    }, [userSignUpStatus, loading, error, user]);

    if (loading || isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    const onCompleteDwollaAccountSubmit = (values) => {
        console.log(values);
        const variables = {
            input: {
                ...transformFormValuesToUserDwollaAccountData(values),
            },
        };

        console.log(variables);

        return createDwollaAccount({
            variables,
        }).then(() => {});
    };

    const onSendMfaCode = async (values) => {
        console.log({values, captcha});
        return enrollUserMfa(values.phone, captcha);
    };

    const onSubmitMfaCode = async (values) => {
        return enrollWithMfaCode(values.code).then(() => {
            forceRefreshUserStatus();
        });
    };

    console.log(userSignUpStatus);
    console.log(USER_STATUS.EMAIL_VERIFIED);

    const pageContent = [
        // 0
        {
            title: 'Create Account',
            content: (
                <SignUpComponent
                    onSubmit={onCreateAccountSubmit}
                ></SignUpComponent>
            ),
            disabled: !!userSignUpStatus,
        },

        // 1
        {
            title: 'Verify Email',
            content: (
                <EmailVerificationComponent
                    onSubmit={() => {}}
                    onSendVerifyEmail={sendEmailVerify}
                    emailSent={false}
                    loading={false}
                ></EmailVerificationComponent>
            ),
            disabled: userSignUpStatus !== USER_STATUS.CREATED,
        },

        // 2
        {
            title: 'Add MFA',
            content: (
                <div>
                    <MfaCreationComponent
                        onSubmit={onSubmitMfaCode}
                        onSendCode={onSendMfaCode}
                    ></MfaCreationComponent>
                    <RecaptchaVerifier
                        captchaComplete={setCaptcha}
                    ></RecaptchaVerifier>
                </div>
            ),
            disabled: userSignUpStatus !== USER_STATUS.EMAIL_VERIFIED,
        },

        // 3
        {
            title: 'Terms and Privacy',
            content: (
                <PolicyAcceptanceComponent
                    onComplete={onComplete}
                ></PolicyAcceptanceComponent>
            ),
            disabled: !(userSignUpStatus === USER_STATUS.MFA_VERIFIED),
        },

        // 4
        {
            title: 'Accreditation',
            content: (
                <Stack spacing={4}>
                    <Typography variant="subtitle1">
                        Legends Solar offers private placements regulated by the
                        SEC under Regulation D. All investors must be accredited
                        in order to participate in Legends Solar offerings.
                    </Typography>

                    <Typography variant="subtitle2" sx={{mt: 7}}>
                        Check all that apply
                    </Typography>

                    <AccreditationStatus
                        onComplete={onComplete}
                    ></AccreditationStatus>
                </Stack>
            ),
            disabled: !(userSignUpStatus === USER_STATUS.ACCEPTANCE_COMPLETE),
        },

        // 5
        {
            title: 'Create Wallet',
            content: (
                <CreateDwollaAccount
                    userStatus={userSignUpStatus}
                    onComplete={onComplete}
                    onSubmit={onCompleteDwollaAccountSubmit}
                    loading={createDwollaAccountLoading}
                ></CreateDwollaAccount>
            ),
            disabled: !(
                userSignUpStatus === USER_STATUS.ACCREDITATION_VERIFIED
            ),
        },

        // 6
        {
            title: 'KBA Validation',
            content: (
                <IdentityVerificationKBA
                    onSubmit={() => {}}
                    kbaQuestions={() => {}}
                ></IdentityVerificationKBA>
            ),
            disabled: !(
                userSignUpStatus === USER_STATUS.DWOLLA_ACCOUNT_KBA_REQ
            ),
            sidebar: false,
        },

        // 7
        {
            title: 'Document Validation',
            content: (
                <IdentityVerificationDocument
                    onSubmit={() => {}}
                ></IdentityVerificationDocument>
            ),
            disabled: !(
                userSignUpStatus === USER_STATUS.DWOLLA_ACCOUNT_DOCUMENT_REQ
            ),
            sidebar: false,
        },

        // 8
        {
            title: 'Complete Sign Up',
            content: (
                <CompleteSignUp
                    onComplete={() => navigate('/explore')}
                ></CompleteSignUp>
            ),
            disabled: !(userSignUpStatus === USER_STATUS.IDENTITY_VERIFIED),
            sidebar: true,
        },

        //     {
        //         title: 'Not Accredited',
        //         content: (
        //             <Stack spacing={6}>
        //                 <Typography variant="headline2">
        //                     Sorry, only accredited investors can sign up
        //                 </Typography>

        //                 <Typography variant="body2">
        //                     {`Reserve panels instead, and we'll be in touch if/when
        //                     we are able to sell panels to non-accredited investors`}
        //                 </Typography>

        //                 <Button
        //                     variant="primary"
        //                     href="https://www.legends.solar/reserve-panels"
        //                 >
        //                     Reserve Panels
        //                 </Button>
        //             </Stack>
        //         ),
        //         disabled: userSignUpState !== 'NOT_ACCREDITED',
        //         sidebar: false,
        //     },
    ];

    return (
        <LinearPageinatedView
            header={
                <Typography variant="smallHeadline">
                    Profile Information
                </Typography>
            }
            pageContent={pageContent}
            pageIndex={pageIndex}
        ></LinearPageinatedView>
    );
};

export default CompleteAccountPage;
