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

const CompleteAccountPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const onComplete = (values) => {
        //shouldn't be needed
        console.log('on complete');
    };

    const {useGetUserStatus, useSetUser, useCreateDwollaAccount} = useUser();

    const {loading, error, status} = useGetUserStatus();
    const [setUser] = useSetUser();
    const {createDwollaAccount, loading: createDwollaAccountLoading} =
        useCreateDwollaAccount();

    const {onCreateAccountSubmit} = useSignIn();

    const [pageIndex, setPageIndex] = useState(0);

    const userSignUpStatus = status;

    const userStatePageIndexMap = (status) => {
        if (!auth.user) {
            return 0;
        }

        if (auth.user && (!status || status === 'CREATED')) {
            return 1;
        }

        const map = {
            NO_ACCOUNT: 0,
            ACCOUNT_CREATED: 1,
            ACCEPTANCE_COMPLETE: 2,
            // Keep user in complete account flow for retry state
            ACCREDITATION_VERIFIED: 3,
            DWOLLA_ACCOUNT_RETRY_REQ: 3,
            DWOLLA_ACCOUNT_KBA_REQ: 4,
            DWOLLA_ACCOUNT_DOCUMENT_REQ: 5,
            IDENTITY_VERIFIED: 6,

            NOT_ACCREDITED: 7,
        };

        return map[status];
    };

    useEffect(() => {
        const newPage = userStatePageIndexMap(userSignUpStatus);
        setPageIndex(newPage);
    }, [userSignUpStatus, loading, error, auth.user]);

    if (loading || auth.isAuthenticating) {
        return <LoadingView></LoadingView>;
    }

    const transformFormValuesToUserDwollaAccountData = (values) => {
        const dob = new Date(`${values.month} ${values.day} ${values.year}`);

        return {
            address: {
                streetAddress: values.streetAddress,
                streetAddress2: values.streetAddress2,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
            },
            firstName: values.firstName,
            lastName: values.lastName,
            ssn: values.ssn,
            dateOfBirth: format(dob, 'P'),
        };
    };

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
        });
    };

    const pageContent = [
        {
            title: 'Create Account',
            content: (
                <SignUpComponent
                    onSubmit={onCreateAccountSubmit}
                ></SignUpComponent>
            ),
            disabled: !!userSignUpStatus,
        },

        {
            title: 'Terms and Privacy',
            content: (
                <PolicyAcceptanceComponent
                    onComplete={onComplete}
                ></PolicyAcceptanceComponent>
            ),
            disabled: !(userSignUpStatus === USER_STATUS.CREATED),
        },

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
        {
            title: 'KBA Validation',
            content: (
                <></>
                // <IdentityVerificationKBA
                //     onComplete={onComplete}
                // ></IdentityVerificationKBA>
            ),
            disabled: !(
                userSignUpStatus === USER_STATUS.DWOLLA_ACCOUNT_KBA_REQ
            ),
            sidebar: false,
        },
        {
            title: 'Document Validation',
            content: (
                <></>
                // <IdentityVerificationDocument
                //     onComplete={onComplete}
                // ></IdentityVerificationDocument>
            ),
            disabled: !(
                userSignUpStatus === USER_STATUS.DWOLLA_ACCOUNT_DOCUMENT_REQ
            ),
            sidebar: false,
        },
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
