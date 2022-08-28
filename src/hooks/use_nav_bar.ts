import {ROUTES} from 'routes/routes';
import {useLocation, useNavigate} from 'react-router-dom';
import {NavBarProps} from 'components/utils/nav_bar';
import {useAuth} from 'hooks/use_auth';
import {useUser} from 'hooks/use_user';
import {useAccount} from './use_accounts';
import {useMemo} from 'react';

const useNavBar = () => {
    const navigate = useNavigate();
    const {authenticated} = useAuth();

    const {useGetUserStatus} = useUser();
    const {useWallet} = useAccount();

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

    const walletBalance = '$' + wallet?.amount;

    const props: NavBarProps = {
        loading: statusLoading || walletLoading,
        userIsAuthenticated: authenticated,
        userVerified: status?.verified || false,
        walletBalance,
        onToHomepage: () => navigate(ROUTES.USER_HOME),
        onYourRooftop: () => navigate(ROUTES.USER_HOME),
        onTransaction: () => navigate(ROUTES.TRANSACTIONS),
        onDocuments: () => navigate(ROUTES.DOCUMENTS),
        onAccount: () => navigate(ROUTES.ACCOUNT),
        onWallet: () => navigate(ROUTES.WALLET),
        onAvailablePanels: () => navigate(ROUTES.DISCOVER),
    };

    return props;
};

export default useNavBar;
