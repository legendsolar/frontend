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
import {ROUTES} from 'routes/routes';
import {UserStatus} from 'schema/schema_gen_types';
import BackButton from 'components/buttons/back_button';
import SignInPage from './sign_in_page';
import DefaultView from 'views/default_view';
import NavBar from 'components/utils/nav_bar';
import DiscoveryContent from 'content/discovery_content';
import assetData from 'static_data/assets';

enum States {
    CREATE_ACCOUNT = 'create_account',
    BASIC_INFO = 'basic_info',
}

const DiscoverPage = () => {
    return (
        <DefaultView
            authenticated={true}
            navBar={
                <NavBar
                    userIsAuthenticated={true}
                    userVerified={true}
                    walletBalance={'100'}
                ></NavBar>
            }
        >
            <DiscoveryContent assets={assetData}></DiscoveryContent>
        </DefaultView>
    );
};

export default DiscoverPage;
