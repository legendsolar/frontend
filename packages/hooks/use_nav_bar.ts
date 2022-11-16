import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from './use_auth';
import {useUser} from './use_user';
import {useAccount} from './use_accounts';
import {useMemo} from 'react';
import {useMediaQuery, useTheme} from '@mui/material';

export enum ROUTES {
    SIGN_IN = '/sign_in',
    CREATE_ACCOUNT = '/create',
    COMPLETE_ACCOUNT = '/complete-account',
    TERMS_AND_CONDITIONS = '/terms-conditions',
    PRIVACY_POLICY = '/privacy',
    USER_HOME = '/rooftop',
    DISCOVER = '/discover',
    DOCUMENTS = '/documents',
    TRANSACTIONS = '/transactions',
    ACCOUNT = '/account',
    WALLET = '/wallet',
    PLAID_OATH_COMPLETE = '/oath-complete',
    ACTION_LINK = '/action-link',
}

const useNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {authenticated, signout} = useAuth();

    const {useGetUserStatus} = useUser();
    const {useWallet} = useAccount();

    const theme = useTheme();
    const constrained = useMediaQuery(theme.breakpoints.down('xl'));

    const {
        loading: statusLoading,
        error: statusError,
        status,
    } = useGetUserStatus();

    const {
        loading: walletLoading,
        error: walletError,
        wallet,
        refetch: walletRefetch,
    } = useWallet();

    useMemo(() => {
        walletRefetch();
    }, [authenticated]);

    const walletBalance = wallet?.amount ? wallet.amount : '-';

    const props = {
        loading: statusLoading || walletLoading,
        userIsAuthenticated: authenticated,
        userVerified: status?.verified || false,
        walletBalance,
        currentState: ('/' + location.pathname.split('/')[1]) as ROUTES,
        constrained,
        onToHomepage: () => navigate(ROUTES.USER_HOME),
        onYourRooftop: () => navigate(ROUTES.USER_HOME),
        onTransaction: () => navigate(ROUTES.TRANSACTIONS),
        onDocuments: () => navigate(ROUTES.DOCUMENTS),
        onAccount: () => navigate(ROUTES.ACCOUNT),
        onWallet: () => navigate(ROUTES.WALLET),
        onLogOut: () => signout(),
        onAvailablePanels: () => navigate(ROUTES.DISCOVER),
    };

    return props;
};

export default useNavBar;
