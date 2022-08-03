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

import DualPaneView from 'views/dual_pane_view';
import WomanPanelsSVG from 'assets/images/women_panel.svg';
import useLinearFlow from 'hooks/use_linear_flow';
import SignUpOptionComponent from 'components/signup/sign_up_option_component';
import CreateAccountContent from 'content/create_account_content';

const CompleteAccountPage = () => {
    const stateIndexes = {
        SIGN_IN: 'SIGN_IN',
        BASIC_INFO: 'BASIC_INFO',
        COMPLETE_ACCOUNT: 'COMPLETE_ACCOUNT',
    };

    const [stateName, setStateName] = useState(stateIndexes.SIGN_IN);

    const userSignUpStatus = null;

    const statusToStateMap = (status) => {
        return stateIndexes.SIGN_IN;
    };

    useEffect(() => {
        const newStateName = statusToStateMap(userSignUpStatus);
        setStateName(newStateName);
    }, [userSignUpStatus]);

    const states = {
        [stateIndexes.SIGN_IN]: <CreateAccountContent></CreateAccountContent>,
        [stateIndexes.BASIC_INFO]: <div>2</div>,
        [stateIndexes.COMPLETE_ACCOUNT]: <div>3</div>,
    };

    return (
        <DualPaneView
            leftPane={states[stateName]}
            rightPane={<img src={WomanPanelsSVG} width="375px"></img>}
        ></DualPaneView>
    );
};

export default CompleteAccountPage;
