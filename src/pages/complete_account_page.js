import {useEffect} from 'react';
import {Typography, Stack, Button} from '@mui/material';
import {useAuth} from 'hooks/use_auth';
import {useNavigate} from 'react-router-dom';
import AccreditationStatus from 'components/signup/accreditation_status';
import CreateDwollaAccount from 'components/signup/create_dwolla_account';
import LoadingView from 'views/loading_view';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserSignUpState, selectUserSignUpState} from 'slices/user_slice';
import IdentityVerificationKBA from 'components/signup/identity_verification_kba';
import {useCloudFunctions} from 'hooks/use_cloud_functions';
import {useParams} from 'react-router-dom';
import LinearPageinatedView from 'views/linear_paginated_view';
import {signUpOrder, userSignUpOrder} from 'utils/user_sign_up_state';
import SignUpComponent from 'components/signup/sign_up_component';
import PolicyAcceptanceComponent from 'components/signup/policy_acceptance_component';
import scrollToPosition from 'utils/scroll_to_position';

const CompleteAccountPage = () => {
    const {step} = useParams();
    console.log(step);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cloudFunctions = useCloudFunctions();
    const auth = useAuth();
    const user = auth.user;

    const userSignUpStateStatus = useSelector(
        (state) => state.user.signUpState.status,
    );

    const userSignUpState = useSelector(selectUserSignUpState);

    console.log('user state: ' + userSignUpState);

    const requestUpdateState = () => {
        if (
            userSignUpStateStatus === 'idle' ||
            userSignUpStateStatus === 'succeeded' ||
            userSignUpStateStatus === 'rejected'
        ) {
            console.log('dispatch user state: line 56, complete account page');
            dispatch(fetchUserSignUpState(cloudFunctions));
        }
    };

    useEffect(() => {
        if (
            auth.user &&
            !auth.isAuthenticating &&
            userSignUpStateStatus === 'idle'
        ) {
            requestUpdateState();

            scrollToPosition(0);
        }
    }, [dispatch, auth.user, auth.isAuthenticating, userSignUpStateStatus]);

    const onComplete = () => {
        requestUpdateState();
    };

    if (userSignUpStateStatus === 'loading') {
        return <LoadingView></LoadingView>;
    }

    const userStatePageIndexMap = {
        NO_ACCOUNT: 0,
        ACCOUNT_CREATED: 1,
        ACCEPTANCE_COMPLETE: 2,
        // Keep user in complete account flow for retry state
        ACCREDATION_VERIF_COMPLETE: 3,
        DWOLLA_ACCOUNT_RETRY_REQ: 3,
        DWOLLA_ACCOUNT_KBA_REQ: 4,
        DWOLLA_ACCOUNT_DOCUMENT_REQ: 5,
        DWOLLA_ACCOUNT_VERIFIED: 6,

        NOT_ACCREDITED: 7,
    };

    window.history.replaceState(
        null,
        null,
        '/complete-account/' + userSignUpState,
    );

    const pageIndex = userStatePageIndexMap[userSignUpState];

    console.log('page index', pageIndex);

    const pageContent = [
        {
            title: 'Create Account',
            content: (
                <SignUpComponent onComplete={onComplete}></SignUpComponent>
            ),
            disabled:
                userSignUpOrder(userSignUpState) !== signUpOrder.NO_ACCOUNT,
        },

        {
            title: 'Terms and Privacy',
            content: (
                <PolicyAcceptanceComponent
                    onComplete={onComplete}
                ></PolicyAcceptanceComponent>
            ),
            disabled:
                userSignUpOrder(userSignUpState) !==
                signUpOrder.ACCOUNT_CREATED,
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
            disabled:
                userSignUpOrder(userSignUpState) !=
                signUpOrder.ACCEPTANCE_COMPLETE,
        },
        {
            title: 'Create Wallet',
            content: (
                <CreateDwollaAccount
                    onComplete={onComplete}
                ></CreateDwollaAccount>
            ),
            disabled:
                userSignUpOrder(userSignUpState) !==
                signUpOrder.ACCREDATION_VERIF_COMPLETE,
        },
        {
            title: 'KBA Validation',
            content: (
                <IdentityVerificationKBA
                    onComplete={onComplete}
                ></IdentityVerificationKBA>
            ),
            disabled: userSignUpState !== 'DWOLLA_ACCOUNT_KBA_REQ',
            sidebar: false,
        },
        {
            title: 'Document Validation',
            content: (
                <IdentityVerificationDocument
                    onComplete={onComplete}
                ></IdentityVerificationDocument>
            ),
            disabled: userSignUpState !== 'DWOLLA_ACCOUNT_DOCUMENT_REQ',
            sidebar: false,
        },
        {
            title: 'Complete Sign Up',
            content: (
                <Stack spacing={6}>
                    <Typography variant="headline1">
                        {`Now it's time to explore solar investments.`}
                    </Typography>

                    <Typography variant="smallHeadline">
                        Your account has been created and you are now able to
                        invest in panels on Legends Solar.
                    </Typography>

                    <Button
                        variant="primary"
                        disabled={userSignUpState !== 'DWOLLA_ACCOUNT_VERIFIED'}
                        onClick={() => {
                            navigate('/explore');
                        }}
                    >
                        Continue
                    </Button>
                </Stack>
            ),
            disabled:
                userSignUpOrder(userSignUpState) !==
                signUpOrder.DWOLLA_ACCOUNT_VERIFIED,
            sidebar: true,
        },

        {
            title: 'Not Accredited',
            content: (
                <Stack spacing={6}>
                    <Typography variant="headline2">
                        Sorry, only accredited investors can sign up
                    </Typography>

                    <Typography variant="body2">
                        {`Reserve panels instead, and we'll be in touch if/when 
                        we are able to sell panels to non-accredited investors`}
                    </Typography>

                    <Button
                        variant="primary"
                        href="https://www.legends.solar/reserve-panels"
                    >
                        Reserve Panels
                    </Button>
                </Stack>
            ),
            disabled: userSignUpState !== 'NOT_ACCREDITED',
            sidebar: false,
        },
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
