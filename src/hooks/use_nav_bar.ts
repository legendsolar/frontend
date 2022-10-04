import {ROUTES} from 'routes/routes';
import {useLocation, useNavigate} from 'react-router-dom';
import {NavBarProps} from 'components/utils/nav_bar';
import {useAuth} from 'hooks/use_auth';
import {useUser} from 'hooks/use_user';
import {useAccount} from './use_accounts';
import {useMemo} from 'react';
import {useMediaQuery, useTheme} from '@mui/material';

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

    const props: NavBarProps = {
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
