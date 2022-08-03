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

import DualPaneView from 'views/dual_pane_view';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import PanelInfinitySVG from 'assets/images/panel_infinity.svg';
import useLinearFlow from 'hooks/use_linear_flow';
import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import CreateAccountContent from 'content/create_account_content';
import AccountCreateInfoContent from 'content/account_create_info_content';
import {routes} from 'routes/app_router';

const CompleteAccountPage = () => {
    const stateIndexes = {
        SIGN_IN: 'sign_in',
        BASIC_INFO: 'basic_info',
        COMPLETE_ACCOUNT: 'complete_account',
    };

    const navigate = useNavigate();

    const [stateName, setStateName] = useState(stateIndexes.SIGN_IN);

    const userSignUpStatus = null;

    const statusToStateMap = (status) => {
        return stateIndexes.SIGN_IN;
    };

    useEffect(() => {
        const newStateName = statusToStateMap(userSignUpStatus);
        setStateName(newStateName);
        navigate(routes.CREATE_ACCOUNT + '/' + newStateName);
    }, [userSignUpStatus]);

    const states = {
        [stateIndexes.SIGN_IN]: (
            <CreateAccountContent
                onSignUpWithEmail={() => setStateName(stateIndexes.BASIC_INFO)}
            ></CreateAccountContent>
        ),
        [stateIndexes.BASIC_INFO]: (
            <AccountCreateInfoContent></AccountCreateInfoContent>
        ),
        [stateIndexes.COMPLETE_ACCOUNT]: <div>3</div>,
    };

    const rightPaneStates = {
        [stateIndexes.SIGN_IN]: <img src={WomanPanelsSVG} width="375px"></img>,
        [stateIndexes.BASIC_INFO]: <img src={PanelInfinitySVG}></img>,
        [stateIndexes.COMPLETE_ACCOUNT]: <div>3</div>,
    };

    const rightPaneJustify = {
        [stateIndexes.SIGN_IN]: 'center',
        [stateIndexes.BASIC_INFO]: 'flex-end',
        [stateIndexes.COMPLETE_ACCOUNT]: 'flex-end',
    };

    return (
        <DualPaneView
            leftPane={states[stateName]}
            rightPane={rightPaneStates[stateName]}
            options={{
                rightPane: {
                    justifyContent: rightPaneJustify[stateName],
                },
            }}
        ></DualPaneView>
    );
};

export default CompleteAccountPage;
