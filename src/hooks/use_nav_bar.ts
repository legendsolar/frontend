import {ROUTES} from 'routes/routes';
import {useLocation, useNavigate} from 'react-router-dom';
import {NavBarProps} from 'components/utils/nav_bar';
import {useAuth} from 'hooks/use_auth';
import {useUser} from 'hooks/use_user';

const useNavBar = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const {useGetUserStatus} = useUser();

    const {
        loading: statusLoading,
        error: statusError,
        status,
    } = useGetUserStatus();

    const props: NavBarProps = {
        loading: statusLoading,
        userIsAuthenticated: !!auth.user,
        userVerified: status.verified,
        walletBalance: '100',
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
